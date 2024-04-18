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
import SideHeader from '@components/layout/SideHeader';
import Wrapper from '@components/Wrapper';

const DetailStyle = styled.div`
    padding: 30px 0;
    .header-title {
      font-size: 30px;
      font-weight: 800;
    }
    .slide-src {
      width: 100%;
      height: 80vw;
      object-fit: cover;
      color: black;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .main-title {
      padding-top: 20px;
      font-size: 30px;
      font-weight: 800;
    }
    .address-bundle {
      margin: 20px 0px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .address {
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
    }
    .bookmark-icon {
      margin-left: auto;
      width: 20px;
    }
    .title {
      font-size: 22px;
      font-weight: 800;
    }
    .order {
      margin: 50px 0px;
    }
    .order-menu {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 20px;
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
    text {
      font-size: 12px;
      cursor: pointer;
      text-decoration: underline;
      color: #828282;
    }
  `;
  
function CafeDetail() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const parsedId = parseInt(_id);
  const user = useRecoilValue(memberState);
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();
  const cafeId = Number(_id);

  

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);

  useEffect(() => {
    const fetchBookmarkData = async () => {
      try {
        if (user) {
          const { data } = await axios.get(`/bookmarks/product`);
          if (data && data.item) {
            const foundItem = data.item.find(
              item => item.product._id === cafeId,
            );
            if (foundItem) {
              setIsBookmarked(true);
              setBookmarkId(foundItem._id);
            } else {
              setIsBookmarked(false);
              setBookmarkId(null);
            }
          } else {
            setIsBookmarked(false);
            setBookmarkId(null);
          }
        }
      } catch (error) {
        console.error('북마크 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchBookmarkData();
  }, [axios, cafeId, user]);

  const handleBookmark = async () => {
    try {
      if (!bookmarkId) {
        const response = await axios.post(`/bookmarks/product/${cafeId}`);
        const data = response.data;
        console.log('북마크 추가함!');
        setIsBookmarked(true);
        setBookmarkId(data.item._id);
      } else {
        await axios.delete(`/bookmarks/${bookmarkId}`);
        console.log('북마크 삭제함!');
        setIsBookmarked(false);
        setBookmarkId(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        await axios.delete(`/bookmarks/${bookmarkId}`);
      } else {
        console.error('북마크 추가/삭제 중 오류 발생:', error);
      }
    }
  };

  const { data } = useQuery({
    queryKey: ['products', _id],
    queryFn: () => axios.get(`/products/${_id}`),
    select: response => response.data,
    suspense: true,
  });

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

  useEffect(() => {
    getReview();
  }, []);

  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem('viewedCafeIds')) || [];
    const updatedIds = savedIds.filter(id => id !== _id); // 기존 id 제거
    updatedIds.unshift(_id); // 새 id를 배열 첫 인덱스에 추가
    localStorage.setItem('viewedCafeIds', JSON.stringify(updatedIds));
  }, [_id]);

  return (
    <>
      <DetailStyle>
      <SideHeader>
        <h1 style={{"fontSize": "30px", "fontWeight": "800"}}>{data.item.name}</h1>
      </SideHeader>
        <Wrapper>
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
              <img src="/public/map_pin.svg" alt="지도로 연결되는 아이콘" />
              {data.item.extra.address}
            </Link>
            <CopyToClipboard
              className="copyBoard"
              text={data.item.extra.address}
              onCopy={() => alert('클립보드에 복사되었습니다.')}
            >
              <text className="copiedText">복사하기</text>
            </CopyToClipboard>
            <img
              className="bookmark-icon"
              src={
                isBookmarked ? '/public/bookmarked.svg' : '/public/bookmark.svg'
              }
              alt="북마크 버튼 이미지"
              onClick={handleBookmark}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className="order">
            <h2 className="title">카공단 제공 메뉴</h2>
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
            <h2 className="title">방문자 리뷰</h2>
            {review?.item.map(item => (
              <div key={_id} className="review-list">
                <span className="review-user">{item.user.name}</span>
                <span className="review-createdAt">{item.createdAt}</span>
                <p className="review-content">{item.content}</p>
              </div>
            ))}
          </div>
        </Wrapper>
      </DetailStyle>
    </>
  );
}

export default CafeDetail;
