import { Link } from 'react-router-dom';

function SearchButton() {
  return (
    <>
      <Link to="/search">
        <img
          style={{
            display: 'block',
            position: 'absolute',
            width: '26px',
            right: '9px',
            top: '17px',
          }}
          src="/search-black.svg"
          alt="검색 버튼"
        />
      </Link>
    </>
  );
}

export default SearchButton;
