import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import ad_01_Img from '@assets/ad_01.jpeg';
import ad_02_Img from '@assets/ad_02.jpeg';
import ad_03_Img from '@assets/ad_03.jpeg';
import {
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar,
  A11y,
} from 'swiper/modules';
import CafeListItem from '@pages/board/CafeListItem';

const HomeStyle = styled.div`
  margin: 0;
  padding-bottom: 200px;

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
  const axios = useCustomAxios();

  const { data } = useQuery({
    queryKey: ['Home'],
    queryFn: () => axios.get('/products'),
    select: response => response.data.item,
    suspense: true,
  });

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
          <img
            className="ad-img"
            src={ad_01_Img}
            alt="카공여지도 광고 이미지"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="ad-img"
            src={ad_02_Img}
            alt="카공여지도 광고 이미지"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="ad-img"
            src={ad_03_Img}
            alt="카공여지도 광고 이미지"
          />
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
        {data?.map(item => (
          <SwiperSlide key={item._id}>
            <CafeListItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </HomeStyle>
  );
}

export default Home;
