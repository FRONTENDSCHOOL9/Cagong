import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import PropTypes from 'prop-types';
import styled from 'styled-components';

AdSwiper.propTypes = {
  adContents: PropTypes.any,
};

const AdStyle = styled.div`
  .ad-container {
    position: relative;
    height: 600px;
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
    pointer-events: none;
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
    position: relative;
  }

  .ad-img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }

  .swiper-pagination-bullet-active {
    background: orange;
  }
`;

function AdSwiper({ adContents }) {
  return (
    <>
      <AdStyle>
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
          {adContents.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="ad-container">
                <img
                  className="ad-img"
                  src={item.imageSrc}
                  alt={item.altText}
                />
                <h1 className="ad-title-overlay">
                  <span className="ad-title-sub">{item.subtitleTop}</span>
                  <br />
                  <span className="ad-title-sub">{item.subtitleBottom}</span>
                  <br />
                  {item.title}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </AdStyle>
    </>
  );
}

export default AdSwiper;
