import StoreList from '@pages/seller/StoreList';
import Login from '@pages/user/Login';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function MyPage() {
  const [login, setLogin] = useState('seller');
  return (
    <>
      {login !== 'user' && login !== 'seller' && <Login />}
      {login === 'user' && <Link to="/users/reviewlist">리뷰 리스트</Link>}
      {login === 'seller' && <StoreList />}
    </>
  );
}

export default MyPage;
