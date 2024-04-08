import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  border: solid 4px;
`;

function Navbar() {
  return (
    <StyledNav>
      <nav>
        <NavLink to="/">Home</NavLink>

        <NavLink to="/boards/map">지도</NavLink>

        <NavLink to="/users/orderlist">내 구매</NavLink>

        <NavLink to="/users/bookmark">북마크</NavLink>

        <NavLink to="/users/mypage">내 정보</NavLink>
      </nav>
    </StyledNav>
  );
}

export default Navbar;
