import SearchButtonSide from '@components/button/SearchButtonSide';
import styled from 'styled-components';
import PrevButtonSide from '@components/button/PrevButtonSide';
import PropTypes from 'prop-types';

function SideHeader({children}) {
  SideHeader.propTypes = {
    children: PropTypes.string.isRequired,
  };

  const HeaderStyle = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    background-color: #fff;
    color: white;
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    color: #222;
    .container{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 20px;
    }
  `;

  return (
    <HeaderStyle>
      <div className='container'>
        <PrevButtonSide className="prev" />
        {children}
        <SearchButtonSide className="search" />
      </div>
    </HeaderStyle>
  );
}

export default SideHeader;