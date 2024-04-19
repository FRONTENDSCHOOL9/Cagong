import { useForm } from 'react-hook-form';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { memberState } from '@recoil/user/atoms.mjs';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import SideHeader from '@components/layout/SideHeader';
import Wrapper from '@components/layout/Wrapper';
import Submit from '@components/Submit';

const ReviewFormStyle = styled.div`
  .header {
    display: flex;
    justify-content: center;
  }
  .title {
    font-size: 25px;
    font-weight: 800;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 40px;
  }
  .name {
    font-size: 24px;
    font-weight: 600;
    margin: 20px;
  }
  .board {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .submit-button {
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
  }
  #content {
    all: unset;
    border: 1px solid #828282;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 8px;
    height: 400px;
    width: 300px;
  }
  #content:focus {
    border: 1px solid #ffa931;
  }
  #content::placeholder {
    font-size: 12px;
    padding-top: 370px;
  }
`;

function ReviewForm() {
  const { register, handleSubmit } = useForm();
  const axios = useCustomAxios();
  const { reviewId } = useParams();
  const parsedId = parseInt(reviewId);
  const user = useRecoilValue(memberState);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['products', reviewId],
    queryFn: () => axios.get(`/products/${reviewId}`),
    select: response => response.data,
    suspense: true,
  });

  const onSubmit = async formData => {
    if (user) {
      try {
        formData.order_id = 1; // order_id는 언제 쓰는 걸까요...???
        formData.product_id = parsedId;
        await axios.post('/replies', formData);
        alert('등록이 완료되었습니다.'); // 등록 후에 orderList에서 어떻게 관리해 줘야 할지......
        navigate('/users/orderlist');
      } catch (err) {
        alert('다시 시도해 주세요.');
      }
    } else {
      const gotoLogin = confirm(
        '로그인 후 이용 가능합니다.\n로그인 화면으로 이동하시겠습니까?',
      );
      gotoLogin && navigate('/users/login');
    }
  };

  return (
    <ReviewFormStyle>
      <SideHeader>
        <div className="header">
          <h1 className="title">리뷰 작성</h1>
        </div>
      </SideHeader>
      <Wrapper>
        <div className="content">
          <h2 className="name">{data.item.name}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="board">
              <textarea
                name="content"
                id="content"
                cols="30"
                rows="10"
                {...register('content')}
                placeholder="악의적인 비방글, 욕설, 도배 등은 관리자에 의해 제제를 받을 수 있습니다."
              ></textarea>
              <Submit className="submit-button">등록하기</Submit>
            </div>
          </form>
        </div>
      </Wrapper>
    </ReviewFormStyle>
  );
}

export default ReviewForm;