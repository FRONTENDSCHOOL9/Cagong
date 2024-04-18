import SearchButton from '@components/button/SearchButton';
import styled from 'styled-components';
import PrevButton from '@components/button/PrevButton';

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
      min-width: 100px;
    }
    .button-bundle{
      display: flex;
      align-items: center;
      gap: 5px;
      margin-right: 10px;
      margin-top: 10px;
    }
  `;

  return (
    <HeaderStyle>
      <img className="logo" src="/public/logo.svg" alt="" />
      <span className="title">카공여지도</span>
      <div className='button-bundle'>
        <PrevButton className="prev-button" />
        <SearchButton className="search-button" />
      </div>
    </HeaderStyle>
  );
}

export default Header;
