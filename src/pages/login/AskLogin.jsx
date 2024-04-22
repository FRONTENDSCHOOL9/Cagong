import Button from '@components/button/Button';
import styled from 'styled-components';
import askLogin_Img from '@assets/askLogin.jpeg';
import { Link } from 'react-router-dom';

const StyledAsk = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;

  .wrapper h1 {
    font-weight: 700;
    padding: 20px;
    text-align: center;
    font-size: 1.6rem;
  }

  .askLogin-img {
    border-radius: 5000px;
    max-width: 200px;
    display: block;
    margin: 0 auto;
  }

  .login-button {
    margin: 0 auto;
    display: block;
    font-size: 1.6rem;
    padding: 15px 35px;
    font-weight: bold;
  }
`;

function AskLogin() {
  return (
    <>
      <StyledAsk>
        <div className="wrapper">
          <img className="askLogin-img" src={askLogin_Img} alt="카공여지도" />
          <h1>
            집중하기 좋은
            <br />
            카페를 찾아보세요.
          </h1>
          <Link to="/users/login">
            <Button className="login-button">로그인 하고 시작하기</Button>
          </Link>
        </div>
      </StyledAsk>
    </>
  );
}

export default AskLogin;
