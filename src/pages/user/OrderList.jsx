import Button from '@components/button/Button';
import { memberState } from '@recoil/user/atoms.mjs';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useState } from 'react';
import Modal from '@components/Modal';

const OrderList = () => {
  const OrderStyle = styled.div`
    margin-bottom: 100px;
    .header {
      display: flex;
      justify-content: center;
    }
    .section {
      display: flex;
    }
    .section-1 {
      flex-grow: 1;
      width: 50%;
      cursor: pointer;
      background-color: white;
      border: 1px solid #d8d8d8;
      border-right: none;
    }
    .section-1:hover {
      color: #ffa931;
    }
    .section-2 {
      flex-grow: 2;
      width: 50%;
      cursor: pointer;
      background-color: white;
      border: 1px solid #d8d8d8;
    }
    .section-2:hover {
      color: #ffa931;
    }
    .login {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .unused-list {
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #d8d8d8;
    }
    .qr {
      width: 150px;
      display: block;
      margin: 0 auto;
    }
    .close-button{
      background-color: #FF6666;
      border: unset;
      border-radius: 0 8px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 26px;
      margin-left: auto;
      cursor: pointer;
    }
    .close-button:hover{
      background-color: #FF4444;
    }
    .cross{
      width: 14px;
    }
    .completed-button{
      display: block;
      font-size: 16px;
      padding: 10px;
      font-weight: bold;
      margin: 0 auto;
    }
  `;

  const user = useRecoilValue(memberState);
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const [modalOpen, setModalOpen] = useState(false);
  const [section, setSection] = useState(true);

  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: () => axios.get('/orders'),
    select: response => response.data,
    suspense: true,
  });

  // state가 completed인 카페 필터링
  const usedProducts = data.item
    .filter(item => item.state === 'completed')
    .map(item => item.products)
    .flat()
    .map(product => product.name);

  // 아직 사용하지 않은 카페 상품
  const unusedProducts = data.item
    .filter(item => item.state !== 'completed')
    .map(item => item.products)
    .flat()
    .map(product => product.name);

  // 모달
  const closeModal = () => {
    setModalOpen(false);
  };

  const showModal = () => {
    setModalOpen(true);
  };

  function handleSection1() {
    setSection(true);
  }

  function handleSection2() {
    setSection(false);
  }

  // 사용 완료 버튼을 눌렀을 때 patch

  async function handleState() {
    try {
      await axios.patch(`/orders/${data.item[2]._id}`, {
        state: 'completed',
      });
      alert('정상 처리되었습니다.');
    } catch (err) {
      console.error(err);
      alert('다시 시도해 주세요.');
    }
  }

  return (
    <OrderStyle>
      <div className="header">
        <h1>구매 내역</h1>
      </div>
      <div className="section">
        <button onClick={handleSection1} className="section-1">
          <h2>보유</h2>
        </button>
        <button onClick={handleSection2} className="section-2">
          <h2>사용 완료</h2>
        </button>
      </div>
      {!user ? (
        <div className="login">
          <p>로그인이 필요한 서비스입니다.</p>
          <Button
            padding="20px 60px"
            fontSize="20px"
            fontWeight="bold"
            onClick={() => navigate('/users/login')}
          >
            로그인
          </Button>
        </div>
      ) : (
        <>
          {section ? (
            <div className="unused">
              {unusedProducts.map(name => (
                <div key={name} className="unused-list">
                  <p>{name}</p>
                  <Button
                    padding="10px 20px;"
                    fontSize="18px"
                    fontWeight="bold"
                    onClick={showModal}
                  >
                    QR 보기
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="unused">
              {usedProducts.map(name => (
                <div key={name} className="unused-list">
                  <p>{name}</p>
                  <Button
                    padding="10px 20px;"
                    fontSize="18px"
                    fontWeight="bold"
                    onClick={() => {
                      navigate('/boards/reviewform');
                    }}
                  >
                    리뷰 쓰기
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {modalOpen && (
        <Modal className="modal">
          <button className="close-button" onClick={closeModal}>
            <img className='cross' src="../public/close.png" alt="" />
          </button>
          <img className="qr" src="../public/qr.png" alt="" />
          <Button className='completed-button' onClick={handleState}>사용 완료</Button>
        </Modal>
      )}
    </OrderStyle>
  );
};

export default OrderList;
