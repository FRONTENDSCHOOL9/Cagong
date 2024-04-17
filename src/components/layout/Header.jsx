import SearchButton from '@components/button/SearchButton';
import { memberState } from '@recoil/user/atoms.mjs';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
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
    }
    .log-button {
      margin: 0 15px;
      border: unset;
      background-color: white;
      border-radius: 4px;
      font-family: 'NanumSquareRound';
      font-weight: bold;
      padding: 8px 12px;
      color: #222;
      cursor: pointer;
    }
  `;
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };
  const [user, setUser] = useRecoilState(memberState);

  return (
    <HeaderStyle>
      <img className="logo" src="/public/logo.svg" alt="" />
      <span className="title">카공여지도</span>
      <SearchButton className="search-button" />
      <div>
        {user ? (
          <button className="log-button" size="sm" onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          <button
            className="log-button"
            onClick={() => navigate('/users/login')}
          >
            로그인
          </button>
        )}
      </div>
    </HeaderStyle>
  );
}

export default Header;
