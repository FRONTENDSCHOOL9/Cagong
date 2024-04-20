import SideHeader from '@components/layout/SideHeader';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyComponent = styled.div`
  .reviewlist-title {
    font-size: 20px;
    font-weight: 800;
    text-align: center;
    padding: 30px;
  }

  .totalReviews {
    padding: 0 22px;
    font-weight: 700;
  }

  .total-point {
    font-weight: 800;
    color: #ff6666;
    font-size: 16px;
  }

  .review-item {
    padding: 20px;
    border: solid 1px #d4d4d4;
    border-radius: 20px;
    margin: 20px;
  }

  .review-item:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  .item-name {
    font-weight: 700;
    display: inline;
  }

  .logo {
    width: 20px;
    padding: 3px;
    margin-bottom: 3px;
  }

  .item-header {
    display: flex;
    align-items: center;
  }

  .createdAt {
    font-size: 12px;
    color: gray;
    text-align: right;
    padding: 15px 0;
  }

  .item-detail {
    font-size: 14px;
  }
`;

function ReviewList() {
  const axios = useCustomAxios();

  const { data } = useQuery({
    queryKey: ['MyReview'],
    queryFn: () => axios.get('/replies/'),
    select: response => response.data.item,
    suspense: true,
  });

  const totalReviews = data ? data.length : 0;

  return (
    <MyComponent>
      <SideHeader />
      <div>
        <h1 className="reviewlist-title">내가 쓴 리뷰</h1>
        <p className="totalReviews">
          총 <span className="total-point">{totalReviews}</span>개
        </p>
        <ul>
          {data.map(item => (
            <Link key={item._id} to={`/boards/cafeDetail/${item._id}`}>
              <li className="review-item" key={item._id}>
                <div className="item-header">
                  <h1 className="item-name">{item.product.name}</h1>
                  <img className="logo" src="/logo.svg" alt="카공여지도 핀" />
                </div>
                <div className="createdAt">{item.createdAt}</div>
                <div className="item-detail">{item.content}</div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </MyComponent>
  );
}

export default ReviewList;
