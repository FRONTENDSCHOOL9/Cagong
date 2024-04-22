import useCustomAxios from '@hooks/useCustomAxios.mjs';
import styled from 'styled-components';
import MainHeader from '@components/layout/MainHeader';
import CafeListItem from '@pages/product/CafeListItem';
import Wrapper from '@components/layout/Wrapper';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';

const MyComponent = styled.div`
  .cafelist-title {
    font-size: 2.2rem;
    font-weight: 800;
    text-align: center;
    padding: 22px;
  }

  .cafelist-item {
    margin-bottom: 20px;
  }
`;

function CafeList() {
  const axios = useCustomAxios();

  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['cafelist'],
    queryFn: ({ pageParam = 1 }) =>
      axios.get('/products', {
        params: {
          page: pageParam,
          limit: import.meta.env.VITE_CAFELIST,
          sort: JSON.stringify({ _id: -1 }),
        },
      }),
    select: response => {
      response.items = response.pages.map(page => page.data.item);
      response.totalPages = response.pages.at(-1).data.pagination.totalPages;
      response.page = response.pages.at(-1).data.pagination.page;
      return response;
    },
    getNextPageParam: lastPage => {
      const pagination = lastPage.data.pagination;
      let nextPage =
        pagination.page < pagination.totalPages ? pagination.page + 1 : false;
      return nextPage;
    },
  });

  // console.log(data);

  let cafeList = [];
  let hasNext = false;
  if (data) {
    cafeList = _.flatten(data.items).map(item => {
      return (
        <CafeListItem className="cafelist-item" key={item._id} item={item} />
      );
    });
    hasNext = data.page < data.totalPages;
  }

  return (
    <>
      <MainHeader />
      <MyComponent>
        <Wrapper>
          <h1 className="cafelist-title">카공 인기카페</h1>
          <InfiniteScroll
            pageStart={1}
            loadMore={fetchNextPage}
            hasMore={!isFetching && hasNext}
          >
            {cafeList}
          </InfiniteScroll>
        </Wrapper>
      </MyComponent>
    </>
  );
}

export default CafeList;
