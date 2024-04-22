import { useForm } from 'react-hook-form';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { memberState } from '@recoil/user/atoms.mjs';
import { useSetRecoilState } from 'recoil';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Submit from '@components/Submit';
import Button from '@components/button/Button';
import Header from '@components/layout/MainHeader';
import Wrapper from '@components/layout/Wrapper';
import styled from 'styled-components';
console.log(useForm);
const FormContainer = styled.div`
  input {
    all: unset;
  }
  .form-container {
    // box-shadow: inset 0px 0px 10px #666;
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

  .button-box {
    display: flex;
    gap: 25px;
  }
  .submit-button {
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    flex-basis: 145px;
    width: 145px;
  }
  .signup-button {
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    flex-basis: 145px;
    width: 145px;
  }
`;

function Login() {
  const location = useLocation();
  const setUser = useSetRecoilState(memberState);
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    values: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async formData => {
    try {
      const res = await axios.post('/users/login', formData);
      setUser({
        _id: res.data.item._id,
        name: res.data.item.name,
        profile: res.data.item.profileImage,
        token: res.data.item.token,
        type: res.data.item.type,
      });
      alert(res.data.item.name + '님 로그인 되었습니다.');
      navigate(location.state?.from ? location.state?.from : '/');
      // 직전 페이지 이동 필요
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
            <div>
              <label className="input-label" htmlFor="email">
                이메일
                <br />
              </label>
              <input
                className="input-box"
                name="email"
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
              {errors.email && (
                <p className="warning-message">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="input-label" htmlFor="password">
                비밀번호
                <br />
              </label>
              <input
                className="input-box"
                name="password"
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                {...register('password', {
                  required: '비밀번호를 입력하세요.',
                })}
              />
              {errors.password && (
                <p className="warning-message">{errors.password.message}</p>
              )}
            </div>
            <div className="button-box">
              <Submit className="submit-button">로그인</Submit>
              <Link to="/users/signup">
                <Button className="signup-button">회원가입</Button>
              </Link>
            </div>
          </form>
        </FormContainer>
      </Wrapper>
    </>
  );
}

export default Login;
