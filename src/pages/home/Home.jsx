import MainHeader from '@components/layout/MainHeader';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import ad_01_Img from '@assets/ad_01.jpeg';
import ad_02_Img from '@assets/ad_02.jpeg';
import ad_03_Img from '@assets/ad_03.jpeg';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import CafeListItem from '@pages/product/CafeListItem';
import AdSwiper from '@components/AdSwiper';

const HomeStyle = styled.div`
  margin: 0;
  padding-bottom: 200px;

  .swiper-button-prev,
  .swiper-button-next {
    color: #fff;
    background-color: #000;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

  .cafelist-title {
    font-size: 2rem;
    font-weight: 800;
    padding: 15px;
    padding-top: 30px;
    padding-bottom: 20px;
  }

  .cafelist-more {
    padding-left: 7px;
  }
`;

const adContents = [
  {
    imageSrc: ad_01_Img,
    altText: '카공여지도 광고 이미지',
    subtitleTop: '집중할 수 있는',
    subtitleBottom: '카페 찾는다면',
    title: '카공여지도',
  },
  {
    imageSrc: ad_02_Img,
    altText: '카공여지도 광고 이미지',
    subtitleTop: '시험 기간에 가기 좋은',
    subtitleBottom: '카페 찾는다면',
    title: '카공여지도',
  },
  {
    imageSrc: ad_03_Img,
    altText: '카공여지도 광고 이미지',
    subtitleTop: '차분한 공간에서',
    subtitleBottom: '커피 마시고 싶다면',
    title: '카공여지도',
  },
];

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
      <MainHeader />
      <AdSwiper adContents={adContents} />

      <Link to="/boards/CafeList">
        <div className="cafelist-title">
          카공 인기 카페
          <img
            className="cafelist-more"
            src="/more-items.svg"
            alt="more-items 버튼"
          />
        </div>
      </Link>

      <Swiper
        modules={[Navigation, A11y, Scrollbar]}
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
