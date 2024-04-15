import { useQuery } from '@tanstack/react-query';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import CafeListItem from '@pages/board/CafeListItem';
import styled from 'styled-components';

const MyComponent = styled.div`
  h1 {
    margin: 0;
    padding: 0;
    text-align: center;
  }
`;

function CafeList() {
  const axios = useCustomAxios();

  const { data } = useQuery({
    queryKey: ['cafelist'],
    queryFn: () => axios.get('/products'),
    select: response => response.data.item,
    suspense: true,
  });

  const cafeList = data?.map(item => (
    <CafeListItem key={item._id} item={item} />
  ));

  return (
    <MyComponent>
      <h1 className="title">카공 인기카페</h1>
      {cafeList}
    </MyComponent>
  );
}

export default CafeList;
