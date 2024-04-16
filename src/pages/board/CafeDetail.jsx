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
import styled from 'styled-components';
import BookmarkButton from '@components/button/BookmarkButton';

function CafeDetail() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const parsedId = parseInt(_id);
  const user = useRecoilValue(memberState);
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();

  const DetailStyle = styled.div`
    margin: 30px;
    .slide-src {
      width: 100%;
      height: 80vw;
      object-fit: cover;
      border-radius: 20px;
    }
    text {
      margin: 5px;
      cursor: pointer;
      font-size: 12px;
      text-decoration: underline;
      color: #878787;
    }
    a {
      text-decoration: none;
      color: black;
    }
    .address-bundle {
      margin: 20px 0px;
    }
    .address {
      font-size: 16px;
      font-weight: 600;
    }
    .title{
      font-size: 22px;
      font-weight: 800;
    }
    .order{
      margin: 50px 0px;
    }
    .order-menu {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: bold;
      margin: 30px 10px;
    }
    .order-price {
      color: #ff6666;
    }
    .order-button {
      width: 100%;
    }
    .review-list {
      margin: 25px 10px;
    }
    .review-user {
      margin-right: 10px;
      font-size: 16px;
      font-weight: bold;
    }
    .review-createdAt {
      font-size: 12px;
      font-weight: bold;
      color: #828282;
    }
    .review-content {
      margin-top: 20px;
      font-size: 14px;
    }
  `;

  const { data } = useQuery({
    queryKey: ['products', _id],
    queryFn: () => axios.get(`/products/${_id}`),
    select: response => response.data,
    suspense: true,
  });

  const cafeId = Number(data.item._id);

  async function handleOrder() {
    try {
      await axios.post(`/orders`, {
        products: [
          {
            _id: parsedId,
            quantity: 1,
          },
        ],
      });
      setIsOrdered(true);
      sessionStorage.setItem('isOrdered', _id);
      alert('구매가 성공적으로 완료되었습니다.');
    } catch (errors) {
      console.log(errors.message);
      alert('구매에 실패하셨습니다.');
    }
  }

  useEffect(() => {
    const isOrderedFromSession = sessionStorage.getItem('isOrdered');
    setIsOrdered(_id === isOrderedFromSession);
  }, []);

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

  const [review, setReview] = useState();

  async function getReview() {
    const response = await axios.get(`/replies/products/${_id}`);
    setReview(response.data);
  }

  // 

  useEffect(() => {
    getReview();
  }, []);

  console.log(data.item)

  return (
    <DetailStyle>
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
            <img className='slide-src'
              src={`${import.meta.env.VITE_API_SERVER}/files/05-cagong/${
                image.name
              }`}
              alt="카페 사진"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="address-bundle">
        <Link className="address" to="/boards/map">
          {data.item.extra.address}
        </Link>
        <CopyToClipboard
          className="copyBoard"
          text={data.item.extra.address}
          onCopy={() => alert('클립보드에 복사되었습니다.')}
        >
          <text className="copiedText">복사하기</text>
        </CopyToClipboard>
      </div>
      <BookmarkButton className='bookmark-button' cafeId={cafeId} />
      <div className="order">
        <h2 className='title'>카공단 제공 메뉴</h2>
        <div className="order-menu">
          <span>{data?.item.content} </span>
          <span className="order-price">{data?.item.price} 원</span>
        </div>
        <Button
          className="order-button"
          padding="10px 80px"
          fontWeight="bold"
          fontSize="14px"
          onClick={confirmUser}
          disabled={isOrdered}
        >
          구매하기
        </Button>
      </div>
      <div className="review">
        <h2 className='title'>방문자 리뷰</h2>
        {review?.item.map(item => (
          <div className='review-list' key={_id}>
            <span className="review-user">{item.user.name}</span>
            <span className="review-createdAt">{item.createdAt}</span>
            <p className="review-content">{item.content}</p>
          </div>
        ))}
      </div>
    </DetailStyle>
  );
}

export default CafeDetail;
