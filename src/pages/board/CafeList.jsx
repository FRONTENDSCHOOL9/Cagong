import { useQuery } from '@tanstack/react-query';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import CafeListItem from '@pages/board/CafeListItem';
import styled from 'styled-components';

const MyComponent = styled.div`
  .cafelist-title {
    font-size: 20px;
    font-weight: 800;
    text-align: center;
    padding: 10px;
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
      <h1 className="cafelist-title">카공 인기카페</h1>
      {cafeList}
    </MyComponent>
  );
}

export default CafeList;
