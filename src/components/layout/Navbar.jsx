import { memberState } from '@recoil/user/atoms.mjs';
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
  justify-content: center;
  nav {
    padding: 0px 30px;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(5, 50px);
    gap: 25px;
    place-items: center;
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

  @media (max-width: 390px) {
      background: red;
      color:red;
    }
  }
`;

function Navbar() {
  const user = useRecoilValue(memberState);

  return (
    <StyledNav>
      <nav>
        <NavLink to="/">
          <img src="/public/nav-home.png" alt="" />
          <span>홈</span>
        </NavLink>

        <NavLink to="/boards/map">
          <img src="/public/nav-map.png" alt="" />
          <span>지도</span>
        </NavLink>

        <NavLink to={user ? '/users/orderlist' : '/users/login'}>
          <img src="/public/nav-order.png" alt="" />
          <span>내 구매</span>
        </NavLink>

        <NavLink to={user ? '/users/bookmark' : '/users/login'}>
          <img src="/public/nav-bookmark.png" alt="" />
          <span>북마크</span>
        </NavLink>

        <NavLink to={user ? '/users/mypage' : '/users/login'}>
          <img src="/public/nav-mypage.png" alt="" />
          <span>내 정보</span>
        </NavLink>
      </nav>
    </StyledNav>
  );
}

export default Navbar;
