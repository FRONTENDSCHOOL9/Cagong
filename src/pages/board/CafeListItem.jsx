import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const MyComponent = styled.div`
  width: 100%;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  img {
    margin: 0;
    padding: 0;
  }

  .cafe-thumb {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    aspect-ratio: 1/1;
  }

  a {
    text-decoration: none;
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
            <li>
              <img
                className="cafe-thumb"
                src={`${BASE_IMAGE_URL}` + item.mainImages[0].name}
              />
              <h2>{item.name}</h2>
              <div>{item.extra.address}</div>
              <div>
                <img src="../public/stars.svg" />
                리뷰 {item.replies}
              </div>
            </li>
          </Link>
        </ul>
      </div>
    </MyComponent>
  );
}

export default CafeListItem;
