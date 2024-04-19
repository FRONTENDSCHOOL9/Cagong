import { useState } from 'react';
import { memberState } from '@recoil/user/atoms.mjs';
import { useRecoilState } from 'recoil';

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

const HeaderStyle = styled.div`
  font-family: 'UhBeeSe_hyun';
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #ffa931;
  color: white;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  .logo {
    width: 40px;
    margin: 0px 10px;
  }
  .title {
    margin-right: auto;
    min-width: 100px;
  }
  .user-name {
    margin-right: auto;
  }
  .button-bundle {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-right: auto;
    margin-top: 10px;
  }
`;

const MyComponent = styled.div`
  .cafelist-title {
    font-size: 20px;
    font-weight: 800;
    text-align: center;
    padding: 10px;
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

  .item-review {
    font-size: 12px;
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
      <HeaderStyle>
        <img className="logo" src="/logo.svg" alt="" />
        {/* <span className="title">카공여지도</span> */}
        <div className="user-name">
          <span>{user.name}님 :)</span>
        </div>
        <div className="button-bundle">
          <PrevButton className="prev-button" />
          <SearchButton className="search-button" />
        </div>
        <LogoutButton
          padding="10px 20px"
          fontWeight="bold"
          fontSize="14px"
          onClick={handleLogout}
        >
          로그아웃
        </LogoutButton>
      </HeaderStyle>

      <Wrapper>
        <MyComponent>
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
            {viewedCafes.map((item, index) => (
              <SwiperSlide key={index}>
                {data.item.map(cafe =>
                  cafe._id === parseInt(item) ? (
                    <Link to={`/boards/cafeDetail/${cafe._id}`} key={cafe._id}>
                      <li className="cafelist-item">
                        <img
                          className="cafe-thumb"
                          src={`${BASE_IMAGE_URL}` + cafe.mainImages[0].name}
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
                ,
              </SwiperSlide>
            ))}
          </Swiper>
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
            {viewedCafes.map((item, index) => (
              <SwiperSlide key={index}>
                {data.item.map(cafe =>
                  cafe._id === parseInt(item) ? (
                    <Link to={`/boards/cafeDetail/${cafe._id}`} key={cafe._id}>
                      <li className="cafelist-item">
                        <img
                          className="cafe-thumb"
                          src={`${BASE_IMAGE_URL}` + cafe.mainImages[0].name}
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
                ,
              </SwiperSlide>
            ))}
          </Swiper>
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
            {viewedCafes.map((item, index) => (
              <SwiperSlide key={index}>
                {data.item.map(cafe =>
                  cafe._id === parseInt(item) ? (
                    <Link to={`/boards/cafeDetail/${cafe._id}`} key={cafe._id}>
                      <li className="cafelist-item">
                        <img
                          className="cafe-thumb"
                          src={`${BASE_IMAGE_URL}` + cafe.mainImages[0].name}
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
                ,
              </SwiperSlide>
            ))}
          </Swiper>
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
            {viewedCafes.map((item, index) => (
              <SwiperSlide key={index}>
                {data.item.map(cafe =>
                  cafe._id === parseInt(item) ? (
                    <Link to={`/boards/cafeDetail/${cafe._id}`} key={cafe._id}>
                      <li className="cafelist-item">
                        <img
                          className="cafe-thumb"
                          src={`${BASE_IMAGE_URL}` + cafe.mainImages[0].name}
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
                ,
              </SwiperSlide>
            ))}
          </Swiper>
        </MyComponent>
      </Wrapper>
    </>
  );
}

export default MyPage;
