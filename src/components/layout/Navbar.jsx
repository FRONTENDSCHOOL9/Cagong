import { memberState } from '@recoil/user/atoms.mjs';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: white;
  z-index: 999;
  box-shadow: 10px 10px 20px 8px gray;
  display: flex;
  nav {
    padding: 0px 30px;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    gap: 30px;
    flex-wrap: wrap;
  }
  a {
    text-decoration: unset;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
  img {
    width: 30px;
  }
`;

function Navbar() {
  const user = useRecoilValue(memberState);
  const [home, setHome] = useState(true);
  const [map, setMap] = useState(false);
  const [order, setOrder] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [myPage, setMyPage] = useState(false);

  function handleHome(){
    setHome(true);
    setMap(false);
    setOrder(false);
    setBookmark(false);
    setMyPage(false);
  }

  function handleMap(){
    setHome(false);
    setMap(true);
    setOrder(false);
    setBookmark(false);
    setMyPage(false);
  }

  function handleOrder(){
    setHome(false);
    setMap(false);
    setOrder(true);
    setBookmark(false);
    setMyPage(false);
  }

  function handleBookmark(){
    setHome(false);
    setMap(false);
    setOrder(false);
    setBookmark(true);
    setMyPage(false);
  }

  function handleMyPage(){
    setHome(false);
    setMap(false);
    setOrder(false);
    setBookmark(false);
    setMyPage(true);
  }

  return (
    <StyledNav>
      <nav>
        <NavLink onClick={handleHome} to="/">
          <img src={home ? "public/home-active.svg" : "/public/nav-home.svg" } alt="" />
          <span>홈</span>
        </NavLink>

        <NavLink onClick={handleMap} to="/boards/map">
          <img src={map ? "/public/map-active.svg" : "/public/nav-map.svg" } alt="" />
          <span>지도</span>
        </NavLink>

        <NavLink onClick={handleOrder} to={user ? '/users/orderlist' : '/asklogin'}>
          <img src={order ? "/public/order-active.svg" : "/public/nav-order.svg" } alt="" />
          <span>내 구매</span>
        </NavLink>

        <NavLink onClick={handleBookmark} to={user ? '/users/bookmark' : '/asklogin'}>
          <img src={bookmark ? "/public/bookmark-active.svg" : "/public/nav-bookmark.svg" } alt="" />
          <span>북마크</span>
        </NavLink>

        <NavLink onClick={handleMyPage} to={user ? '/users/mypage' : '/asklogin'}>
          <img src={myPage ? "/public/mypage-active.svg" : "/public/nav-mypage.svg" } alt="" />
          <span>내 정보</span>
        </NavLink>
      </nav>
    </StyledNav>
  );
}

export default Navbar;
