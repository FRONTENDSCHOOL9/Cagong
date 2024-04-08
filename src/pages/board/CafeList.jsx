import Header from '@components/layout/Header';
import { Link } from 'react-router-dom';

function CafeList() {
  return (
    <>
      <h1>CafeList</h1>
      <Header />
      <Link to="/boards/cafedetail">cafedetail</Link>
    </>
  );
}

export default CafeList;
