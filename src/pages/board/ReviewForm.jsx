import Submit from '@components/Submit';
import { useForm } from 'react-hook-form';
import useCustomAxios from '@hooks/useCustomAxios.mjs';

function ReviewForm() {
  const { register, handleSubmit } = useForm();
  const axios = useCustomAxios();

  // v 테스트 중...... 그런데 아예 전송 자체가 안 됨 ㄱ- 대략난감한 상태~
  const onSubmit = async formData => {
    formData.order_id = 1;
    formData.product_id = 5;
    await axios.post('/replies', formData);
    alert('등록이 완료되었습니다.');
  };

  return (
    <>
      <h1>리뷰 작성</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            {...register('content')}
          ></textarea>
        </div>
      </form>
      <Submit>등록하기</Submit>
    </>
  );
}

export default ReviewForm;
