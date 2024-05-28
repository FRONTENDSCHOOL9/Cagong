import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './button/Button';

ProductMenu.propTypes = {
  data: PropTypes.object,
  confirmUser: PropTypes.func,
  isOrdered: PropTypes.any,
};

const MenuStyle = styled.div`
  .order-menu {
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 20px;
    margin: 30px 10px;
  }
  .order-price {
    color: #ff6666;
  }
  .order-button {
    width: 100%;
    padding: 15px;
  }
`;

function ProductMenu({ data, confirmUser, isOrdered }) {
  return (
    <MenuStyle>
      <div className="order">
        <div className="order-menu">
          <span>{data?.item.content} </span>
          <span className="order-price">{data?.item.price} 원</span>
        </div>
        <Button
          className="order-button"
          fontWeight="bold"
          fontSize="1.4rem"
          onClick={confirmUser}
          disabled={isOrdered}
        >
          구매하기
        </Button>
      </div>
    </MenuStyle>
  );
}

export default ProductMenu;
