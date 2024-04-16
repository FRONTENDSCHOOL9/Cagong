import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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
    margin-top: 20px;
  }

  .bookmark-icon {
    position: absolute;
    right: 0;
    z-index: 1;
    padding: 10px;
    cursor: pointer;
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
  const [bookmarks, setBookmarks] = useState([]);

  const { data } = useQuery({
    queryKey: ['isBookmarkedlist'],
    queryFn: () => axios.get('/bookmarks/product'),
    select: response => response.data.item,
    suspense: true,
  });

  const deleteBookmark = async index => {
    try {
      const getId = data[index]._id;
      await axios.delete(`/bookmarks/${getId}`);
      console.log('북마크 삭제함!');
      const updatedBookmarks = [...bookmarks];
      updatedBookmarks.splice(index, 1);
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error('북마크 추가/삭제 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    setBookmarks(data.map(item => item._id));
  }, [data]);

  return (
    <MyComponent>
      <div>
        <h1 className="cafelist-title">찜한 카페</h1>
        <ul>
          {bookmarks.map((bookmarkId, index) => (
            <li key={bookmarkId}>
              <img
                className="bookmark-icon"
                src="/public/bookmarked.svg"
                alt="북마크 버튼 이미지"
                onClick={() => deleteBookmark(index)}
              />
              <Link to={`/boards/cafeDetail/${data[index].product._id}`}>
                <div className="bookmarked-cafe">
                  <div className="cafe-thumb-overlay">
                    <img
                      className="cafe-thumb"
                      src={`${BASE_IMAGE_URL}${data[index].product.image.name}`}
                    />
                  </div>
                  <h2 className="item-name">{data[index].product.name}</h2>
                  <div className="item-address">
                    {data[index].product.extra.address}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </MyComponent>
  );
}

export default Bookmark;
