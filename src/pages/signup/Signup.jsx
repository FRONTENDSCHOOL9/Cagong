import Submit from '@components/Submit';
import Button from '@components/button/Button';
import Header from '@components/layout/MainHeader';
import Wrapper from '@components/layout/Wrapper';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  input {
    all: unset;
  }
  .signup-title {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 40px;
    text-align: left;
  }
  .form-container {
    // box-shadow: inset 0 0 10px red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    height: 100vh;
    flex-grow: 1;
    gap: 20px;
  }

  .input-label {
    font-size: 16px;
    font-weight: 800;
  }

  .message-box {
    display: flex;
    justify-content: space-between;
  }

  .input-box {
    background-color: #eeeeee;
    flex-basis: 315px;
    width: 315px;
    height: 62px;
    margin-top: 4px;
    border-radius: 8px;
    padding-left: 4px;
  }

  input::placeholder {
    font-weight: 600;
  }

  .warning-message {
    color: red;
  }

  .submit-container {
    // box-shadow: inset 0 0 10px red;
    // min-width: 320px;
    // flex-basis: 320px;
    display: flex;
  }
  .button-box {
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    flex-basis: 145px;
    width: 145px;
  }
`;

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
      <Header />
      <Wrapper>
        <FormContainer>
          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="signup-title">
              <h1>고객님의 정보를 입력해 주세요.</h1>
            </div>
            <div>
              <div className="message-box">
                <label htmlFor="name">이름</label>
                {errors.name && (
                  <p className="warning-message">{errors.name.message}</p>
                )}
              </div>

              <input
                className="input-box"
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
            </div>
            <div>
              <div className="message-box">
                <label htmlFor="email">이메일</label>
                {errors.email && (
                  <p className="warning-message">{errors.email.message}</p>
                )}
              </div>

              <input
                className="input-box"
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
            </div>
            <div>
              <div className="message-box">
                <label htmlFor="password">비밀번호</label>

                {errors.password && (
                  <p className="warning-message">{errors.password.message}</p>
                )}
              </div>

              <input
                className="input-box"
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                {...register('password', {
                  required: '비밀번호를 입력하세요.',
                })}
              />
            </div>
            <div className="button-box">
              <Submit classNmae="signup-button">회원가입</Submit>
            </div>
          </form>
        </FormContainer>
      </Wrapper>
    </>
  );
}

export default Signup;
