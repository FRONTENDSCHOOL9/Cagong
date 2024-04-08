import { Link } from 'react-router-dom';

function StoreList() {
  return (
    <>
      <h1>StoreList</h1>
      <Link to="/sellers/createstoreform">Create Store List</Link>
      <Link to="/sellers/createproductform">Create Product List</Link>
    </>
  );
}

export default StoreList;
