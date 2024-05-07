import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import PropTypes from 'prop-types';
import styled from 'styled-components';

ProductSwiper.propTypes = {
  data: PropTypes.object,
};

const StyledSwiper = styled.div`
  .slide-src {
    width: 100%;
    object-fit: cover;
    color: black;
    border-radius: 30px;
    aspect-ratio: 1/1;
  }
`;

function ProductSwiper({ data }) {
  return (
    <StyledSwiper>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        centeredSlides={true}
      >
        {data.item.mainImages?.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="slide-src"
              src={`${import.meta.env.VITE_API_SERVER}/files/${
                import.meta.env.VITE_CLIENT_ID
              }/${image.name}`}
              alt="카페 사진"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledSwiper>
  );
}

export default ProductSwiper;
