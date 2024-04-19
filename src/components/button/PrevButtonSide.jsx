import { Link } from 'react-router-dom';

function PrevButton() {
  return (
    <>
      <Link to={-1}>
        <img
          style={{
            display: 'block',
            position: 'absolute',
            width: '38px',
            left: '4px',
            top: '11px',
          }}
          src="/back-arrow-black.svg"
          alt="뒤로가기 버튼"
        />
      </Link>
    </>
  );
}

export default PrevButton;
