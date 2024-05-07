import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { memberState } from '@recoil/user/atoms.mjs';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import SideHeader from '@components/layout/SideHeader';
import Wrapper from '@components/layout/Wrapper';
import ProductSwiper from '@components/ProductSwiper';
import ProductReview from '@components/ProductReview';
import ProductAddress from '@components/ProductAddress';
import ProductMenu from '@components/ProductMenu';
import ProductIntro from '@components/ProductIntro';

const DetailStyle = styled.div`
  .container {
    padding: 30px;
  }
  .main {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
  .bookmark-icon {
    width: 20px;
  }
  .title {
    font-size: 2.2rem;
    font-weight: 800;
    padding-bottom: 30px;
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

  const fetchBookmarkData = async () => {
    try {
      if (user) {
        const { data } = await axios.get(`/bookmarks/product`);
        if (data && data.item) {
          const foundItem = data.item.find(item => item.product._id === cafeId);
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

  useEffect(() => {
    fetchBookmarkData();
  }, []);

  const handleBookmark = async () => {
    try {
      if (!bookmarkId) {
        const response = await axios.post(`/bookmarks/product/${cafeId}`);
        const data = response.data;
        setIsBookmarked(true);
        setBookmarkId(data.item._id);
      } else {
        await axios.delete(`/bookmarks/${bookmarkId}`);
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
      let orderedItems =
        JSON.parse(sessionStorage.getItem('orderedItems')) || [];

      orderedItems.push(_id);

      sessionStorage.setItem('orderedItems', JSON.stringify(orderedItems));

      alert('구매가 성공적으로 완료되었습니다.');
    } catch (errors) {
      console.log(errors.message);
      alert('구매에 실패하셨습니다.');
    }
  }

  useEffect(() => {
    const isOrderedFromSession = sessionStorage.getItem('isOrdered');
    setIsOrdered(_id === isOrderedFromSession);

    let orderedItems = JSON.parse(sessionStorage.getItem('orderedItems')) || [];

    const isAlreadyOrdered = orderedItems.some(id => id === _id);

    setIsOrdered(isAlreadyOrdered);
  }, []);

  const confirmUser = () => {
    if (!user) {
      localStorage.setItem('targetPath', location.pathname);
      navigate('/asklogin');
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

  const savedIds = JSON.parse(localStorage.getItem('viewedCafeIds')) || [];
  const updatedIds = savedIds.filter(id => id !== _id); // 기존 id 제거
  updatedIds.unshift(_id); // 배열 첫 인덱스에 추가

  // 배열 길이 제한
  if (updatedIds.length > 10) {
    updatedIds.splice(10);
  }

  localStorage.setItem('viewedCafeIds', JSON.stringify(updatedIds));

  //지도 페이지로 주소 정보를 넘기기 위한 코드
  const [addressData, setAddressData] = useState({});
  useEffect(() => {
    setAddressData(data?.item.extra.address);
  }, []);
  const handleDetailToMap = () => {
    // console.log(addressData);
    navigate('/boards/map', { state: { addressData } });
  };

  return (
    <>
      <SideHeader>
        <div style={{ display: 'flex', gap: '10px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>
            {data.item.name}
          </h1>
          <img
            className="bookmark-icon"
            src={isBookmarked ? '/bookmarked.svg' : '/bookmark.svg'}
            alt="북마크 버튼 이미지"
            onClick={handleBookmark}
            style={{ cursor: 'pointer', width: '20px' }}
          />
        </div>
      </SideHeader>
      <DetailStyle>
        <Wrapper>
          <div className="container">
            <ProductSwiper data={data} />
            <div className="address">
              <ProductAddress
                data={data}
                handleDetailToMap={handleDetailToMap}
              />
            </div>
            <div className="main">
              <div className="intro">
                <h2 className="title">카페 소개</h2>
                <ProductIntro data={data} />
              </div>
              <div className="menu">
                <h2 className="title">카공단 제공 메뉴</h2>
                <ProductMenu
                  data={data}
                  confirmUser={confirmUser}
                  isOrdered={isOrdered}
                />
              </div>
              <div className="review">
                <h2 className="title">방문자 리뷰</h2>
                <ProductReview review={review} />
              </div>
            </div>
          </div>
        </Wrapper>
      </DetailStyle>
    </>
  );
}

export default CafeDetail;
