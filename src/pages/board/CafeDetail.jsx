import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/dist';
import Button from '@components/button/Button';
import { useParams } from 'react-router-dom';

function CafeDetail() {
  const axios = useCustomAxios();
  let { _id } = useParams();

  const [data, setData] = useState();

  async function getProducts() {
    const response = await axios.get(`/products/${_id}`);
    setData(response.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function handleOrder(){
    // const response = await axios.patch('');
    alert('구매가 성공적으로 완료되었습니다.');
  }

  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
      >
        {data?.item.mainImages?.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              style={{ width: '300px', height: '300px' }}
              src={`${import.meta.env.VITE_API_SERVER}/files/05-cagong/${
                image.name
              }`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Link to="/boards/map">{data?.item.extra.address}</Link>
      <button>복사하기</button>

      <h2>카공단 제공 메뉴</h2>
      <p>
        <span>{data?.item.content} </span>
        {data?.item.price} 원
      </p>
      <Button padding="10px 80px" fontWeight="bold" fontSize="14px" onClick={handleOrder}>구매하기</Button>
    </>
  );
}

export default CafeDetail;
