import Submit from '@components/Submit';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async formData => {
    try {
      formData.type = 'user';

      console.log(formData);

      const res = await axios.post('/users', formData);
      alert(
        res.data.item.name +
          '님 회원가입이 완료 되었습니다.\n로그인 후에 이용하세요.',
      );
      navigate('/users/login');
    } catch (err) {
      // AxiosError(네트워크 에러-response가 없음, 서버의 4xx, 5xx 응답 상태 코드를 받았을 때-response 있음)
      if (err.response?.data.errors) {
        // API 서버가 응답한 에러
        err.response?.data.errors.forEach(error =>
          setError(error.path, { message: error.msg }),
        );
      } else if (err.response?.data.message) {
        alert(err.response?.data.message);
      }
    }
  };

  return (
    <>
      <h1>Signup</h1>
      <div>
        <div>
          <div>
            <h2>회원가입</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                placeholder="이름을 입력하세요"
                {...register('name', {
                  required: '이름을 입력하세요.',
                  minLength: {
                    value: 2,
                    message: '이름을 2글자 이상 입력하세요.',
                  },
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                {...register('email', {
                  required: '이메일을 입력하세요.',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: '이메일 형식이 아닙니다.',
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                {...register('password', {
                  required: '비밀번호를 입력하세요.',
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
              <Submit>회원가입</Submit>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
