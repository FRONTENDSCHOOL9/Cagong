import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyComponent = styled.div`
padding: 10px;
  .cafelist-title {
    font-size: 20px;
    font-weight: 800;
    text-align: center;
    padding: 10px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
    gap: 10px;
  }

  li {
    border-radius: 20px;
    position: relative;
    margin-bottom: 40px;
  }


  .bookmark-icon {
    position: absolute;
    right: 0;
    z-index: 1;
    padding: 10px
  }

  .cafe-thumb {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    aspect-ratio: 1/1;
  }

  .cafe-thumb-overlay {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

    .item-name {
      font-weight: 700;
      padding: 0 2px;
      padding-top: 10px;
    }
  
    .item-address {
      font-size: 12px;
      padding: 0 2px;
      line-height: 16px;
    }

    .cafe-thumb-overlay::after {
      display: inline;
      content: '';
      position: absolute;
      overflow: hidden;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0) 100%
      );
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

  return (
    <MyComponent>
      <div>
        <h1 className="cafelist-title">찜한 카페</h1>
        <ul>
          {data?.map(item => (
            <Link key={item._id} to={`/boards/cafeDetail/${item.product._id}`}>
              <li key={item._id}>
                <div className="bookmarked-cafe">
                  <img
                    className="bookmark-icon"
                    src="/public/bookmarked.svg"
                    alt="북마크 버튼 이미지"
                  />
                  <div className="cafe-thumb-overlay">
                    <img
                      className="cafe-thumb"
                      src={`${BASE_IMAGE_URL}` + item.product.image.name}
                    />
                  </div>
                  <h2 className="item-name">{item.product.name}</h2>
                  <div className="item-address">
                    {item.product.extra.address}
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </MyComponent>
  );
}

export default Bookmark;
