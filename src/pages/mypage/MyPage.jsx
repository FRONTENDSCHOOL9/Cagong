import { useState } from 'react';
import { memberState } from '@recoil/user/atoms.mjs';
import { useRecoilState } from 'recoil';
import MainHeader from '@components/layout/MainHeader';

import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SearchButton from '@components/button/SearchButton';
import styled from 'styled-components';
import PrevButton from '@components/button/PrevButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Scrollbar } from 'swiper/modules';
import Wrapper from '@components/layout/Wrapper';
import LogoutButton from '@components/button/LogoutButton';
import Button from '@components/button/Button';

const UserProfileBox = styled.div`
  font-family: 'NanumSquareRound';
  height: 240px;
  margin: auto;
  // padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  color: #222222;
  z-index: 999;

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 180px;
    flex-basis: 180px;
    margin-left: 10px;
    margin-right: auto;
  }
  .user-name {
    margin-right: auto;
    font-weight: 600;
    font-size: 2rem;
  }

  .rank-box {
    margin-right: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #643f2a;
    height: 30px;
    flex-basis: auto;
    padding: 0 10px;
    border-radius: 10px;
  }
  .user-rank {
    font-size: 1.2rem;
    font-weight: 500;
    color: #ffe977;
  }

  .profile-img-box {
    background-color: red;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid #d9d9d9;
    overflow: hidden;
  }

  .profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .logout-button {
    padding: 10px 20px;
    font-weight: 600;
    font-size: 1.6rem;
  }
`;

const MyComponent = styled.div`
  .profile-container {
    display: block;
    padding: 10px;
    justify-content: center;
  }

  .cafelist-title {
    font-size: 2rem;
    font-weight: 800;
    text-align: left;
    padding: 10px;
    border-top: 1px solid #d9d9d9;
  }

  .morecafe-button {
    margin: 0 auto;
    display: block;
    font-size: 1.6rem;
    padding: 15px 35px;
    font-weight: 600;
  }

  .cafe-thumb {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    aspect-ratio: 1/1;
  }

  .cafelist-item {
    padding: 10px;
  }

  .item-description {
    padding: 10px 0;
  }

  .item-name {
    font-weight: 700;
    font-size: 2rem;
  }

  .item-address {
    font-size: 1.6rem;
    padding: 4px 0;
  }

  .empty-viewed {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40vh;
  }

  .empty-viewed h2 {
    text-align: center;
    line-height: 22px;
    font-weight: 700;
    padding: 20px;
  }

  .morelist-title {
    font-size: 2rem;
    font-weight: 800;
    display: flex;
    padding: 10px;
    border-top: 1px solid #d9d9d9;
  }

  .cafelist-more {
    margin-left: auto;
    text-align: right;
  }

  .empty-subtitle {
    font-family: 'UhBeeSe_hyun';
    font-size: 4rem;
    color: #bdbdbd;
  }
`;

function MyPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };
  const axios = useCustomAxios();
  const [user, setUser] = useRecoilState(memberState);

  /* // */
  let profileImage = user?.profileImage;

  // profileImage가 존재하고 객체이며 비어있지 않은 경우
  if (profileImage && Object.keys(profileImage).length !== 0) {
    // profileImage를 이미지 URL로 변환
    profileImage = `${import.meta.env.VITE_API_SERVER}/files/${
      import.meta.env.VITE_CLIENT_ID
    }/${profileImage}`;
  } else {
    // profileImage가 존재하지 않거나 비어있는 경우 기본 이미지 사용
    profileImage = '/profile_01.png';
  }
  /* // */
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('/products'),
    select: response => response.data,
    suspense: true,
  });

  const storedViewedCafes = localStorage.getItem('viewedCafeIds');
  const initialViewedCafes = storedViewedCafes
    ? JSON.parse(storedViewedCafes)
    : [];
  const [viewedCafes] = useState(initialViewedCafes);

  // const BASE_IMAGE_URL = `${import.meta.env.VITE_API_SERVER}/files/05-cagong/`;
  const BASE_IMAGE_URL = `${import.meta.env.VITE_API_SERVER}/files/${
    import.meta.env.VITE_CLIENT_ID
  }/`;

  return (
    <>
      <MainHeader />
      <Wrapper>
        <MyComponent>
          <div className="profile-container">
            <UserProfileBox>
              <div className="profile-img-box">
                {/*  <img
                  className="profile-img"
                  src={
                    user.profile && Object.keys(user.profile).length !== 0
                      ? `${import.meta.env.VITE_API_SERVER}/files/${
                          import.meta.env.VITE_CLIENT_ID
                        }/${user.profile}`
                      : '/profile_01.png'
                  }
                  alt="프로필 이미지"
                /> */}
                <img
                  className="profile-img"
                  src={profileImage}
                  alt="프로필 이미지"
                />
              </div>

              <div className="user-info">
                <div className="user-name">{user.name}님 :)</div>
                <div className="rank-box">
                  <span className="user-rank">카공병아리🐣</span>
                </div>
              </div>
              <Button className="logout-button" onClick={handleLogout}>
                로그아웃
              </Button>
            </UserProfileBox>
          </div>
          <div className="cafelist-title">최근 조회한 카페</div>
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
            {viewedCafes.length > 0 ? (
              viewedCafes.map((item, index) => (
                <SwiperSlide key={index}>
                  {data.item.map(cafe =>
                    cafe._id === parseInt(item) ? (
                      <Link
                        to={`/boards/cafeDetail/${cafe._id}`}
                        key={cafe._id}
                      >
                        <li className="cafelist-item">
                          <img
                            className="cafe-thumb"
                            src={`${BASE_IMAGE_URL}${cafe.mainImages[0].name}`}
                            alt={cafe.name}
                          />
                          <div className="item-description">
                            <h2 className="item-name">{cafe.name}</h2>
                            <div className="item-address">
                              {cafe.extra.address}
                            </div>
                          </div>
                        </li>
                      </Link>
                    ) : null,
                  )}
                </SwiperSlide>
              ))
            ) : (
              <div className="empty-viewed">
                <div>
                  <span className="empty-subtitle">텅.. </span>
                </div>
                <h2>최근 조회한 카페 내역이 없습니다.</h2>
                <Link to="/boards/CafeList">
                  <Button
                    className="morecafe-button"
                    fontSize="18px"
                    fontWeight="bold"
                  >
                    카페 찾아보기
                  </Button>
                </Link>
              </div>
            )}
          </Swiper>
          <Link to="/users/reviewlist">
            <div className="morelist-title">
              리뷰 관리
              <img
                className="cafelist-more"
                src="/more-items.svg"
                alt="more-items 버튼"
              />
            </div>
          </Link>
        </MyComponent>
      </Wrapper>
    </>
  );
}

export default MyPage;
