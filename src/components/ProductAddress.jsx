import PropTypes from 'prop-types';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';

ProductAddress.propTypes = {
  data: PropTypes.object,
  handleDetailToMap: PropTypes.func,
  setToast: PropTypes.func,
  toast: PropTypes.any,
};

const AddressStyle = styled.div`
  .copy-board {
    font-size: 1.1rem;
    cursor: pointer;
    text-decoration: underline;
    color: #828282;
  }
  .address-bundle {
    margin: 20px 0px;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  .address {
    color: #222;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'NanumSquareRound';
    font-size: 1.3rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    text-decoration: underline;
  }
`;

function ProductAddress({ data, handleDetailToMap, setToast }) {
  return (
    <AddressStyle>
      <div className="address-bundle">
        <button className="address" onClick={handleDetailToMap}>
          <img src="/map_pin.svg" alt="지도로 연결되는 아이콘" />
          {data.item.extra.address}
        </button>
        <CopyToClipboard
          className="copy-board"
          text={data.item.extra.address}
          onCopy={() => setToast(true)}
        >
          <span className="copy-text">복사하기</span>
        </CopyToClipboard>
      </div>
    </AddressStyle>
  );
}

export default ProductAddress;
