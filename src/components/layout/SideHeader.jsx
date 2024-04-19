import SearchButtonSide from '@components/button/SearchButtonSide';
import styled from 'styled-components';
import PrevButtonSide from '@components/button/PrevButtonSide';
import PropTypes from 'prop-types';

SideHeader.propTypes = {
  children: PropTypes.any,
};

const HeaderStyle = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: white;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  color: #222;
  border-bottom: 1px solid #d9d9d9;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .search {
    padding-top: 7px;
  }
`;

function SideHeader({ children }) {
  return (
    <HeaderStyle>
      <div className="container">
        <PrevButtonSide />
        {children}
        <SearchButtonSide />
      </div>
    </HeaderStyle>
  );
}

export default SideHeader;
