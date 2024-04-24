import { memberState } from '@recoil/user/atoms.mjs';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
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
  justify-content: center;
  nav {
    padding: 0px 30px;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  a {
    text-decoration: unset;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    min-width: 37px;
  }
  img {
    width: 30px;
  }
  span {
    font-size: 12px;
  }
`;

function Navbar() {
  const user = useRecoilValue(memberState);
  const [home, setHome] = useState(false);
  const [map, setMap] = useState(false);
  const [order, setOrder] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [myPage, setMyPage] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = async (link, destination) => {
    if (!user) {
      localStorage.setItem('targetPath', destination);
      Navigate('/asklogin');
    } else {
      setActiveLink(null);
    }
  };

  function handleHome() {
    setHome(true);
    setMap(false);
    setOrder(false);
    setBookmark(false);
    setMyPage(false);
  }

  function handleMap() {
    setHome(false);
    setMap(true);
    setOrder(false);
    setBookmark(false);
    setMyPage(false);
  }

  function handleOrder() {
    setHome(false);
    setMap(false);
    setOrder(true);
    setBookmark(false);
    setMyPage(false);
  }

  function handleBookmark() {
    setHome(false);
    setMap(false);
    setOrder(false);
    setBookmark(true);
    setMyPage(false);
  }

  function handleMyPage() {
    setHome(false);
    setMap(false);
    setOrder(false);
    setBookmark(false);
    setMyPage(true);
  }

  return (
    <StyledNav>
      <nav>
        <Link onClick={handleHome} to="/">
          <img src={home ? '/home-active.svg' : '/nav-home.svg'} alt="" />
          <span>홈</span>
        </Link>

        <Link onClick={handleMap} to="/boards/map">
          <img src={map ? '/map-active.svg' : '/nav-map.svg'} alt="" />
          <span>지도</span>
        </Link>

        <Link
          onClick={() => {
            handleOrder();
            handleLinkClick('order', '/users/orderlist');
          }}
          to={user ? '/users/orderlist' : '/asklogin'}
          className={activeLink === 'order' ? 'active' : ''}
        >
          <img src={order ? '/order-active.svg' : '/nav-order.svg'} alt="" />
          <span>내 구매</span>
        </Link>

        <Link
          onClick={() => {
            handleBookmark();
            handleLinkClick('bookmark', '/users/bookmark');
          }}
          to={user ? '/users/bookmark' : '/asklogin'}
          className={activeLink === 'bookmark' ? 'active' : ''}
        >
          <img
            src={bookmark ? '/bookmark-active.svg' : '/nav-bookmark.svg'}
            alt=""
          />
          <span>북마크</span>
        </Link>

        <Link
          onClick={() => {
            handleMyPage();
            handleLinkClick('mypage', '/users/mypage');
          }}
          to={user ? '/users/mypage' : '/asklogin'}
          className={activeLink === 'mypage' ? 'active' : ''}
        >
          <img src={myPage ? '/mypage-active.svg' : '/nav-mypage.svg'} alt="" />
          <span>내 정보</span>
        </Link>
      </nav>
    </StyledNav>
  );
}

export default Navbar;
