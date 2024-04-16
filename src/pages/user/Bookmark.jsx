import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyComponent = styled.div`
  width: 100%;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  img {
    margin: 0;
    padding: 0;
  }

  .cafe-thumb {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    aspect-ratio: 1/1;
  }

  a {
    text-decoration: none;
  }

  .cafelist-title {
    font-size: 20px;
    font-weight: 800;
    text-align: center;
    padding: 10px;
  }
`;

function Bookmark() {
  const BASE_IMAGE_URL = `${import.meta.env.VITE_API_SERVER}/files/05-cagong/`;

  const axios = useCustomAxios();

  const { data } = useQuery({
    queryKey: ['isBookmarkedlist'],
    queryFn: () => axios.get('/bookmarks/product'),
    select: response => response.data.item,
    suspense: true,
  });

  const bookmarkList = data?.map(item => (
    <Link key={item._id} to={`/boards/cafeDetail/${item.product._id}`}>
      <li key={item._id}>
        <img
          className="cafe-thumb"
          src={`${BASE_IMAGE_URL}` + item.product.image.name}
        />
        <h2> {item.product.name}</h2>
        <div>{item.product.extra.address}</div>
      </li>
    </Link>
  ));

  return (
    <MyComponent>
      <div>
        <h1 className="cafelist-title">찜한 카페</h1>
        <ul>{bookmarkList}</ul>
      </div>
    </MyComponent>
  );
}

export default Bookmark;
