import Navbar from '@components/Navbar';
import Button from '@components/button/Button';
import Header from '@components/layout/Header';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Header />
      <h1>home</h1>
      <Link to="/boards/CafeList">카공 인기 카페</Link>
      <Button fontSize="20px" padding="10px 20px" fontWeight="bold">
        버튼
      </Button>
      <Navbar />
    </>
  );
}

export default Home;
