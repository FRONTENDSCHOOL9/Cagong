import { Link } from 'react-router-dom';

function PrevButton() {
  return (
    <>
      <Link to={-1}><img src="../public/prev-arrow.png" alt="뒤로가기 버튼" /></Link>
    </>
  );
}

export default PrevButton;
