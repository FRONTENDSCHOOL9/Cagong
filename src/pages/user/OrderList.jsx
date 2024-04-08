import Button from '@components/button/Button';
import { Link } from 'react-router-dom';

function OrderList() {
  return (
    <>
      <h1>OrderList</h1>
      <Button fontSize="20px" padding="10px 20px" fontWeight="bold">
        <Link to="/boards/reviewform">Review</Link>
      </Button>
    </>
  );
}

export default OrderList;
