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
import { useQuery } from '@tanstack/react-query';
import CopyToClipboard from 'react-copy-to-clipboard';

function CafeDetail() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const user = useRecoilValue(memberState);
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['products', _id],
    queryFn: () => axios.get(`/products/${_id}`),
    select: response => response.data,
    suspense: true,
  });

  const confirmUser = () => {
    if (!user) {
      const gotoLogin = confirm(
        '로그인 후 이용 가능합니다.\n로그인 화면으로 이동하시겠습니까?',
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
      localStorage.setItem('isOrdered', true);
      alert('구매가 성공적으로 완료되었습니다.');
    } catch (err) {
      alert('구매에 실패하셨습니다.');
    }
  }

  const [review, setReview] = useState();

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
        style={{
          '--swiper-navigation-color': '#828282',
          '--swiper-pagination-color': '#828282',
        }}
        lazy={true}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={3}
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
              style={{ width: '300px', height: '300px', objectFit: 'cover' }}
              src={`${import.meta.env.VITE_API_SERVER}/files/05-cagong/${
                image.name
              }`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Link to="/boards/map">{data.item.extra.address}</Link>
      <CopyToClipboard
        className="copyBoard"
        text={data.item.extra.address}
        onCopy={() => alert('클립보드에 복사되었습니다.')}
      >
        <text
          className="copiedText"
          style={{ cursor: 'pointer', fontSize: '12px' }}
        >
          {' '}
          복사하기
        </text>
      </CopyToClipboard>

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
        <div key={_id}>
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
