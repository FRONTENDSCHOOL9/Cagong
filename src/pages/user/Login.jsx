import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <h1>Login</h1>
      <Link to="/users/signup">Signup</Link>
    </>
  );
}

export default Login;
