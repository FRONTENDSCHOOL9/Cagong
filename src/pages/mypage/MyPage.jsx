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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #222222;
  z-index: 999;
  width: 100%;
  .user-name {
    margin: 10px auto;
  }
  .user-profile {
    width: 100px;
    height: 100px;
  }
`;

const MyComponent = styled.div`
  .cafelist-title {
    font-size: 20px;
    font-weight: 800;
    text-align: left;
    padding: 10px;
  }
  .morelist-title {
    font-size: 20px;
    font-weight: 800;
    text-align: left;
    padding: 10px;
    border-top: 1px solid #d9d9d9;
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
    font-size: 18px;
  }

  .item-address {
    font-size: 14px;
    padding: 4px 0;
  }

  // .item-review {
  //   font-size: 12px;
  // }

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

  .moreCafe-button {
    margin: 0 auto;
    display: block;
    font-size: 16px;
    padding: 15px 35px;
    font-weight: bold;
  }

  .empty-subtitle {
    font-family: 'UhBeeSe_hyun';
    font-size: 40px;
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

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('/products'),
    select: response => response.data,
    suspense: true,
  });
  // console.log(data.item[0]._id);

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
          <UserProfileBox>
            <img
              className="user-profile"
              src={
                user.profile
                  ? `${import.meta.env.VITE_API_SERVER}/files/${
                      import.meta.env.VITE_CLIENT_ID
                    }/${user.profile}`
                  : '/profile_01.png'
              }
              alt="프로필 이미지"
            />
            <div className="user-name">
              <span>{user.name}님 :)</span>
            </div>
            <LogoutButton
              padding="10px 20px"
              fontWeight="bold"
              fontSize="14px"
              onClick={handleLogout}
            >
              로그아웃
            </LogoutButton>
          </UserProfileBox>
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
                    className="moreCafe-button"
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
