import Button from '@components/button/Button';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const OrderListStyle = styled.div`
    .section{
      display: flex;
    }
    .own-button{
      width: 500px;
      all: unset;
      cursor: pointer;
      border-right: 1px solid black;
    }
    .use-expire-button{
      all: unset;
      cursor: pointer;
    }
  `;

  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(true);
  const [showReview, setShowReview] = useState(false);

  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: () => axios.get('/orders'),
    select: response => response.data,
    suspense: true,
  });

  const renderingButton = useMemo(() => {
    if (showQR) {
      return <Button>QR 보기</Button>;
    } else if (showReview) {
      return <Button onClick={()=>{navigate('/boards/reviewForm')}}>리뷰 쓰기</Button>;
    } else {
      return null;
    }
  }, [showQR, showReview]);

  return (
    <OrderListStyle>
      <h1>구매 내역</h1>
      <div className='section'>
        <button
          onClick={() => {
            setShowQR(true);
            setShowReview(false);
          }}
          className="own-button"
        >
          보유
        </button>
        <button
          onClick={() => {
            setShowQR(false);
            setShowReview(true);
          }}
          className="use-expire-button"
        >
          사용 / 만료
        </button>
      </div>
      <div className="own">
        {data.item.map((item, index) => (
          <div key={index} className="own-list">
            <h3>주문 내역</h3>
            {item.products.map(product => (
              <p key={product.id}>{product.name}</p>
            ))}
            {renderingButton}
          </div>
        ))}
      </div>
    </OrderListStyle>
  );
};

export default OrderList;
