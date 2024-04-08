import { Link } from 'react-router-dom';

function PrevButton() {
  return (
    <>
      <Link to={-1}>Prev</Link>
    </>
  );
}

export default PrevButton;
