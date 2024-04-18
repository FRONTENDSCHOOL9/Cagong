import { useState, useEffect } from 'react';
import { memberState } from '@recoil/user/atoms.mjs';
import { useRecoilState } from 'recoil';

import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@components/layout/MainHeader';
import SearchButton from '@components/button/SearchButton';
import styled from 'styled-components';
import PrevButton from '@components/button/PrevButton';
import Button from '@components/button/Button';
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
  .login-info {
    display: flex;
    margin: 0 auto;
  }
  .button-bundle {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-right: 10px;
    margin-top: 10px;
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

  const [viewedCafes, setViewedCafes] = useState([]);

  useEffect(() => {
    // localStorage에서 저장된 최근 조회한 카페 id
    const storedViewedCafes = localStorage.getItem('viewedCafeIds');

    // 저장된 id로 상태 업데이트
    if (storedViewedCafes) {
      setViewedCafes(JSON.parse(storedViewedCafes));
    }
  }, []);
  // console.log([...viewedCafes].reverse()); //로컬 스토리지의 id 배열 뒤집기

  const BASE_IMAGE_URL = `${import.meta.env.VITE_API_SERVER}/files/05-cagong/`;

  return (
    <>
      <HeaderStyle>
        <img className="logo" src="/logo.svg" alt="" />
        <span className="title">카공여지도</span>
        <div className="login-info">
          <span>{user.name}님 :)</span>
          <Button onClick={handleLogout}>로그아웃</Button>
        </div>
        <div className="button-bundle">
          <PrevButton className="prev-button" />
          <SearchButton className="search-button" />
        </div>
      </HeaderStyle>

      <div>
        <text>Mypage</text>
        {user && <div>정보</div>}

        <div className="cafelist-title">최근 조회한 카페</div>

        {viewedCafes.map(item =>
          data.item.map(cafe =>
            cafe._id === parseInt(item) ? (
              <Link to={`/boards/cafeDetail/${cafe._id}`} key={cafe._id}>
                <img
                  src={`${BASE_IMAGE_URL}` + cafe.mainImages[0].name}
                  alt={cafe.name}
                />
                <h3>{cafe.name}</h3>
                <span>{cafe.extra.address}</span>
              </Link>
            ) : null,
          ),
        )}
      </div>
    </>
  );
}

export default MyPage;
