import Button from '@components/button/Button';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import Login from './Login';
// import { useRecoilValue } from 'recoil';
// import { memberState } from '@recoil/user/atoms.mjs';
import Modal from '@components/Modal';

const OrderList = () => {
  const OrderListStyle = styled.div`
    margin: unset;

    .section {
      display: flex;
      border: 1px solid #828282;
    }
    .own-section{
      flex-grow: 1;
      border-right: 1px solid #828282;
    }
    .use-expire-section{
      flex-grow: 1;
    }
    .own-button {
      all: unset;
      cursor: pointer;
    }
    .use-expire-button {
      all: unset;
      cursor: pointer;
    }
    .qr {
      width: 200px;
      display: block;
    }
  `;

  const axios = useCustomAxios();
  // const user = useRecoilValue(memberState);
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: () => axios.get('/orders'),
    select: response => response.data,
    suspense: true,
  });

  const showModal = () => {
    setModalOpen(true);
  };

  const renderingButton = useMemo(() => {
    if (showQR) {
      return <Button onClick={showModal}>QR 보기</Button>;
    } else if (showReview) {
      return (
        <Button
          onClick={() => {
            navigate('/boards/reviewForm');
          }}
        >
          리뷰 쓰기
        </Button>
      );
    } else {
      return null;
    }
  }, [showQR, showReview]);

  return (
    <>
      <OrderListStyle>
        <h1>구매 내역</h1>
        <div className="section">
          <div className='own-section'>
            <button
              onClick={() => {
                setShowQR(true);
                setShowReview(false);
              }}
              className="own-button"
            >
              보유
            </button>
          </div>
          <div className='use-expire-section'>
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
        {modalOpen && (
          <Modal>
            <button className="close" onClick={closeModal}>
              X
            </button>
            <img className="qr" src="../public/qr.png" alt="" />
          </Modal>
        )}
      </OrderListStyle>
    </>
  );
};

export default OrderList;
