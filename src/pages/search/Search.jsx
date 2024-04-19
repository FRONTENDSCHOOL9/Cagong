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
        <div>
          <h1>최근 검색 카페</h1>
          {searchHistory.length > 0 ? (
            <ul>
              {searchHistory.map(keyword => (
                <li key={keyword}>
                  <Link to={`/search?keyword=${keyword}`}>{keyword}</Link>
                  <button
                    type="button"
                    onClick={() => removeSearchHistory(keyword)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>최근 검색어 내역이 존재하지 않습니다.</p>
          )}
          <button onClick={clearSearchHistory}>검색 기록 지우기</button>
          <hr />
          {searchHistory.length > 0 ? (
            <h1>총 카페 {data?.item.length}건이 검색 되었습니다.</h1>
          ) : (
            <h1>인기 검색 카페</h1>
          )}
        </div>
        <Swiper
          modules={[Navigation, A11y, Pagination, Scrollbar, Autoplay]}
          slidesPerView={2}
          loop={true}
          autoplay={true}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        >
          <ul>
            {data?.item.map(item => (
              <SwiperSlide key={item._id}>
                <li
                  style={{ width: '240px' }}
                  className="cagong-list"
                  key={item._id}
                >
                  <Link key={item._id} to={`/boards/cafeDetail/${item._id}`}>
                    <div>
                      <img
                        style={{ width: '200px', height: '200px' }}
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
                    {item.name}
                    <div>{item.extra.address}</div>
                    <div>
                      <img className="stars" src="/stars.svg" />
                      리뷰 {item.replies}
                    </div>
                  </Link>
                </li>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
      </Wrapper>
    </>
  );
}

export default Search;
