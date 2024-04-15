import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar,
  A11y,
} from 'swiper/modules';

const HomeStyle = styled.div`
  margin: 0;

  .swiper-ad {
    width: 100%;
    height: 600px;
    display: block;
    object-fit: cover;
  }

  .swiper-ad img {
    width: 100%;
  }

  .swiper-pagination-bullet-active {
    background: orange;
  }

  .cafe-thumb {
    width: 500px;
    height: 500px;
  }

  .cafelist-title {
    font-size: 50px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: #fff;
    background-color: #000;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
`;

function Home() {
  const [data, setData] = useState([]);
  const axios = useCustomAxios();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_SERVER}/products`).then(res => {
      const items = res.data.item;
      for (let i = 0; i < items.length; i++) {
        // console.log(items[i]);
        setData(items);
      }
    });
  }, []);

  return (
    <HomeStyle>
      <h1>집중할 수 있는 카페 찾는다면 카공여지도</h1>
      <Swiper
        className="swiper-ad"
        modules={[Navigation, Pagination, Autoplay, A11y]}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img className="ad-img" src="/public/cagongAd01.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="ad-img" src="/public/cagongAd01.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="ad-img" src="/public/cagongAd01.png" alt="" />
        </SwiperSlide>
      </Swiper>

      <Link to="/boards/CafeList">
        <div className="cafelist-title">
          카공 인기 카페
          <img src="/public/more-items.svg" alt="more-items 버튼" />
        </div>
      </Link>

      <Swiper
        modules={[Navigation, A11y, Pagination, Scrollbar]}
        slidesPerView={2}
        loop={false}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        <ul>
          {data.map(item => (
            <SwiperSlide key={item._id}>
              <li className="cagong-list" key={item._id}>
                <Link key={item._id} to={`/boards/cafeDetail/${item._id}`}>
                  <div>
                    <img
                      className="cafe-thumb"
                      src={
                        import.meta.env.VITE_API_SERVER +
                        '/files/05-cagong/' +
                        item.mainImages[1].name
                      }
                      alt="카페 메인 사진"
                    />
                  </div>
                  {item.name}
                  <div>{item.extra.address}</div>
                  <div>
                    <img className="stars" src="/public/stars.svg" />
                    리뷰 {item.replies}
                  </div>
                </Link>
              </li>
            </SwiperSlide>
          ))}
        </ul>
      </Swiper>
    </HomeStyle>
  );
}

export default Home;
