import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const MyComponent = styled.div`
  .cafe-thumb {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    aspect-ratio: 1/1;
  }

  .cafelist-item {
    padding: 10px;
  }

  .item-description {
    padding: 10px 0;
  }

  .item-name {
    font-weight: 700;
    font-size: 18px;
  }

  .item-address {
    font-size: 14px;
    padding: 4px 0;
  }

  .item-review {
    font-size: 12px;
  }
`;

CafeListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

function CafeListItem({ item }) {
  const BASE_IMAGE_URL = `${import.meta.env.VITE_API_SERVER}/files/05-cagong/`;

  return (
    <MyComponent className="cafelist">
      <div>
        <ul>
          <Link to={`/boards/cafeDetail/${item._id}`}>
            <li className="cafelist-item">
              <img
                className="cafe-thumb"
                src={`${BASE_IMAGE_URL}` + item.mainImages[0].name}
              />
              <div className="item-description">
                <h2 className="item-name">{item.name}</h2>
                <div className="item-address">{item.extra.address}</div>
                <div className="item-review">
                  <img src="../public/stars.svg" />
                  리뷰 {item.replies}
                </div>
              </div>
            </li>
          </Link>
        </ul>
      </div>
    </MyComponent>
  );
}

export default CafeListItem;
