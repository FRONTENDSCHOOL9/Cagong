import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <Link to="/">홈</Link>
      <Link to="/boards/map">지도</Link>
      <Link to="/users/orderlist">내구매</Link>
      <Link to="/users/bookmark">북마크</Link>
      <Link to="/users/mypage">내정보</Link>
    </>
  );
}

export default Navbar;
