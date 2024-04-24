import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MainHeader from '@components/layout/MainHeader';
import Wrapper from '@components/layout/Wrapper';
import Button from '@components/button/Button';

const MyComponent = styled.div`
  height: 100vh;
  padding-bottom: 22px;

  .bookmarkedCafe {
    padding: 0 10px;
  }

  .cafelist-title {
    font-size: 2.2rem;
    font-weight: 800;
    text-align: center;
    padding: 22px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
    gap: 10px;
  }

  li {
    border-radius: 20px;
    position: relative;
    margin-bottom: 20px;
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
    margin-bottom: 10px;
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
    font-size: 1.6rem;
  }

  .item-address {
    font-size: 1.2rem;
    padding: 0 2px;
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
  }

  .emptybookmark {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }

  .emptybookmark h2 {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 700;
    padding: 20px;
  }

  .moreCafe-button {
    margin: 0 auto;
    display: block;
    font-size: 1.6rem;
    padding: 15px 35px;
    font-weight: bold;
  }

  .empty-subtitle {
    font-family: 'UhBeeSe_hyun';
    font-size: 4rem;
    color: #bdbdbd;
  }
`;
function Bookmark() {
  const BASE_IMAGE_URL = `${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/`;
  const axios = useCustomAxios();
  const [bookmarks, setBookmarks] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ['isBookmarkedlist'],
    queryFn: () => axios.get('/bookmarks/product'),
    select: response => response.data.item,
    suspense: true,
    gcTime: 10,
  });

  const deleteBookmark = async bookmarkId => {
    try {
      await axios.delete(`/bookmarks/${bookmarkId}`);
      const updatedBookmarks = bookmarks.filter(id => id !== bookmarkId);
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error('북마크 추가/삭제 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (data) {
      setBookmarks(data.map(item => item._id));
    }
  }, [data]);

  return (
    <>
      <MainHeader />
      <Wrapper>
        <MyComponent>
          <div>
            {!isLoading && (
              <>
                {bookmarks.length === 0 ? (
                  <div className="emptybookmark">
                    <div>
                      <span className="empty-subtitle">텅.. </span>
                    </div>
                    <h2>
                      마음에 드는 카페를 <br /> 찜해주세요!
                    </h2>
                    <Link to="/boards/CafeList">
                      <Button className="moreCafe-button">
                        카페 찜하러 가기
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="bookmarkedCafe">
                    <h1 className="cafelist-title">찜한 카페</h1>
                    <ul>
                      {bookmarks.map(bookmarkId => {
                        const bookmarkItem = data.find(
                          item => item._id === bookmarkId,
                        );
                        if (!bookmarkItem || !bookmarkItem.product) return null;
                        return (
                          <li className="bookmark-item" key={bookmarkId}>
                            <img
                              className="bookmark-icon"
                              src="/bookmarked.svg"
                              alt="북마크 버튼 이미지"
                              onClick={() => deleteBookmark(bookmarkId)}
                            />
                            <Link
                              to={`/boards/cafeDetail/${bookmarkItem.product._id}`}
                            >
                              <div className="bookmarked-cafe">
                                <div className="cafe-thumb-overlay">
                                  <img
                                    className="cafe-thumb"
                                    src={`${BASE_IMAGE_URL}${bookmarkItem.product.image.name}`}
                                    alt={bookmarkItem.product.name}
                                  />
                                </div>
                                <h2 className="item-name">
                                  {bookmarkItem.product.name}
                                </h2>
                                <div className="item-address">
                                  {bookmarkItem.product.extra.address}
                                </div>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </MyComponent>
      </Wrapper>
    </>
  );
}

export default Bookmark;
