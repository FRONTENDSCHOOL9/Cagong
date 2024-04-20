import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar,
  A11y,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';
import SearchForm from '@pages/search/SearchForm';
import SideHeader from '@components/layout/SideHeader';
import Wrapper from '@components/layout/Wrapper';
import styled from 'styled-components';

const SearchStyle = styled.div`
  padding: 15px;
  margin-top: 8vh;
  .recent-searches {
  }
  .recent-searches_header {
    display: flex;
    justify-content: space-between;
  }

  .recent-searches_header_title {
    font-weight: 600;
    font-size: 0.8rem;
    margin-bottom: 15px;
  }

  .recent-searches_header_reset {
    font-size: 0.6rem;
    border: none;
    color: #b3b3b3;
    background-color: white;
    font-family: 'NanumSquareRound';
    cursor: pointer;
  }

  .recent-searches_emptymessage {
    font-size: 0.6rem;
    margin-bottom: 0px;
    margin-left: 15px;
  }

  .recent-searches_list-item {
    font-size: 0.8rem;
    display: flex;
    align-items: start;
    margin-left: 15px;
    margin-bottom: 5px;
  }

  .recent-searches_list-item_delete {
    border: none;
    background-color: white;
    width: 25px;
  }

  .recent-searches_list-item_delete-icon {
    display: block;
    width: 100%;
    cursor: pointer;
  }

  .recent-searches_line {
    margin-top: 20px;
  }

  .search-result-message {
    margin-top: 15px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .search-result-message strong {
    font-weight: 600;
    color: #ffa931;
  }

  .trending-cafelist {
    font-weight: 600;
    font-size: 1rem;
    margin: 30px 0 20px 0;
  }

  .cafe-thumb {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    aspect-ratio: 1/1;
  }

  .cafelist-item {
    padding: 10px;
  }

  .item-description {
    padding: 10px 0;
  }

  .item-name {
    font-weight: 700;
    font-size: 18px;
  }

  .item-address {
    font-size: 14px;
    padding: 4px 0;
  }

  .item-review {
    font-size: 12px;
  }
`;

function Search() {
  const axios = useCustomAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      axios.get(`/products`, {
        params: {
          keyword: searchParams.get('keyword'),
        },
      }),
    select: response => response.data,
    suspense: true,
  });

  // console.log(data);

  //검색기록 변수
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    //검색 기록 변수에 담기
    const history = JSON.parse(sessionStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);
    refetch();
  }, [searchParams.toString()]);

  // 검색 기록 지워주는 함수
  function clearSearchHistory() {
    sessionStorage.removeItem('searchHistory');
    setSearchHistory([]);
  }

  // URL 검색 매개 변수 업데이트
  function handleSearch(keyword) {
    searchParams.set('keyword', keyword);
    setSearchParams(searchParams);
  }
  // console.log(searchParams);

  // 검색기록 옆 X 버튼 삭제 함수
  function removeSearchHistory(keyword) {
    const filteredHistory = searchHistory.filter(item => item !== keyword);
    sessionStorage.setItem('searchHistory', JSON.stringify(filteredHistory));
    setSearchHistory(filteredHistory);

    // 필터링 된 검색기록이 없을 시 X 버튼 클릭하면 주소 키워드 초기화
    if (filteredHistory.length === 0) {
      searchParams.delete('keyword');
      setSearchParams(searchParams);
    }
  }

  return (
    <>
      <SideHeader>
        <SearchForm onClick={handleSearch} />
      </SideHeader>

      <Wrapper>
        <SearchStyle>
          <div className="recent-searches">
            <div className="recent-searches_header">
              <h1 className="recent-searches_header_title">최근 검색 카페</h1>
              <button
                className="recent-searches_header_reset"
                onClick={clearSearchHistory}
              >
                모두 지우기
              </button>
            </div>
            {searchHistory.length > 0 ? (
              <ul className="recent-searches_list">
                {searchHistory.map(keyword => (
                  <li className="recent-searches_list-item" key={keyword}>
                    <Link to={`/search?keyword=${keyword}`}>{keyword}</Link>
                    <button
                      className="recent-searches_list-item_delete"
                      type="button"
                      onClick={() => removeSearchHistory(keyword)}
                    >
                      <img
                        className="recent-searches_list-item_delete-icon"
                        src="/search_delete.svg"
                        alt="삭제 버튼"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="recent-searches_emptymessage">
                최근 검색어 내역이 존재하지 않습니다.
              </p>
            )}

            <hr className="recent-searches_line" />
            {searchHistory.length > 0 ? (
              <h1 className="search-result-message">
                총 카페 <strong>{data?.item.length}</strong>건이 검색
                되었습니다.
              </h1>
            ) : (
              <h1 className="trending-cafelist">인기 검색 카페</h1>
            )}
          </div>
          <Swiper
            modules={[Navigation, A11y, Pagination, Scrollbar, Autoplay]}
            slidesPerView={2}
            loop={false}
            autoplay={true}
            pagination={{
              clickable: true,
              el: null,
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
          >
            <ul>
              {data?.item.map(item => (
                <SwiperSlide key={item._id}>
                  <li className="cafelist-item" key={item._id}>
                    <Link key={item._id} to={`/boards/cafeDetail/${item._id}`}>
                      <div>
                        <img
                          className={'cafe-thumb'}
                          src={
                            import.meta.env.VITE_API_SERVER +
                            '/files/' +
                            import.meta.env.VITE_CLIENT_ID +
                            '/' +
                            item.mainImages[0].name
                          }
                          alt="카페 메인 사진"
                        />
                      </div>
                      <div className="item-description">
                        <h2 className="item-name">{item.name}</h2>
                        <div className="item-address">{item.extra.address}</div>
                        <div className="item-review">
                          <img className="stars" src="/stars.svg" />
                          리뷰 {item.replies}
                        </div>
                      </div>
                    </Link>
                  </li>
                </SwiperSlide>
              ))}
            </ul>
          </Swiper>
        </SearchStyle>
      </Wrapper>
    </>
  );
}

export default Search;
