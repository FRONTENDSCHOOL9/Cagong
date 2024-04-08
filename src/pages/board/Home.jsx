import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>home</h1>
      <Link to="/boards/CafeList">카공 인기 카페</Link>
    </>
  );
}

export default Home;
