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
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { memberState } from '@recoil/user/atoms.mjs';

function CafeDetail() {
  const axios = useCustomAxios();
  let { _id } = useParams();
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [review, setReview] = useState();

  async function getProducts() {
    const response = await axios.get(`/products/${_id}`);
    setData(response.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  // useEffect(() => {
  //   // 버튼 클릭 시 로컬 스토리지에 isOrdered 값 저장
  //   localStorage.setItem('isOrdered', isOrdered.toString());
  // }, [isOrdered]);

  const user = useRecoilValue(memberState);

  const confirmUser = () => {
    if (!user) {
      const gotoLogin = confirm(
        '로그인 후 이용 가능합니다. \n 로그인 화면으로 이동하시겠습니까?',
      );
      gotoLogin && navigate('/users/login');
    } else {
      handleOrder();
    }
  };

  async function handleOrder() {
    try {
      await axios.post(`/orders`),
        {
          products: {
            _id,
            quantity: 1,
          },
          address: {
            name: 'null',
            value: 'null',
          },
        };
      setIsOrdered(true);
      alert('구매가 성공적으로 완료되었습니다.');
    } catch (err) {
      alert('구매에 실패하셨습니다.');
    }
  }

  async function getReview() {
    const response = await axios.get(`/replies/${_id - 1}`);
    setReview(response.data);
  }

  useEffect(() => {
    getReview();
  }, []);

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
      <Button
        padding="10px 80px"
        fontWeight="bold"
        fontSize="14px"
        onClick={confirmUser}
        disabled={isOrdered}
      >
        구매하기
      </Button>
      <h2>방문자 리뷰</h2>
      {review?.item.map(item => (
        <div key={item._id}>
          <p>{item.createdAt}</p>
          <p>{item.content}</p>
        </div>
      ))}
      <br />
      <br />
      <br />
    </>
  );
}

export default CafeDetail;
