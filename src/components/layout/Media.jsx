import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import ad_01_Img from '@assets/ad_01.jpeg';
import ad_02_Img from '@assets/ad_02.jpeg';
import ad_03_Img from '@assets/ad_03.jpeg';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';

const MediaStyle = styled.div`
  .ad-container {
    position: relative;
    height: 650px;
  }

  .ad-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    pointer-events: none; /* 클릭 이벤트를 방지하여 이미지를 클릭할 수 있도록 합니다. */
  }

  .ad-title-sub {
    font-weight: 400;
  }

  .ad-title-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    padding-bottom: 40px;
    padding-left: 20px;
    color: white;
    font-size: 30px;
    font-weight: bold;
    line-height: 36px;
    z-index: 100;
  }

  .swiper-ad img {
    width: 100%;
    object-fit: cover;
    height: 100%;
    position: relative; /* 이미지 위에 요소를 배치할 수 있도록 위치 속성을 설정 */
  }

  .ad-img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }

  .swiper-pagination-bullet-active {
    background: orange;
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

function Media() {
  return (
    <MediaStyle>
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
          <div className="ad-container">
            <img
              className="ad-img"
              src={ad_01_Img}
              alt="카공여지도 광고 이미지"
            />
            <h1 className="ad-title-overlay">
              <span className="ad-title-sub">
                집중할 수 있는
                <br /> 카페 찾는다면
              </span>
              <br />
              카공여지도
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="ad-container">
            <img
              className="ad-img"
              src={ad_02_Img}
              alt="카공여지도 광고 이미지"
            />
            <h1 className="ad-title-overlay">
              <span className="ad-title-sub">
                시험 기간에 가기 좋은
                <br /> 카페 찾고 있다면
              </span>
              <br />
              카공여지도
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="ad-container">
            <img
              className="ad-img"
              src={ad_03_Img}
              alt="카공여지도 광고 이미지"
            />
            <h1 className="ad-title-overlay">
              <span className="ad-title-sub">
                차분한 공간에서
                <br /> 커피 마시고 싶다면
              </span>
              <br />
              카공여지도
            </h1>
          </div>
        </SwiperSlide>
      </Swiper>
    </MediaStyle>
  );
}

export default Media;
