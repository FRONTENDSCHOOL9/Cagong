import { Link } from 'react-router-dom';

function SearchButton() {
  return (
    <>
      <Link to="/search">
        <img
          style={{
            display: 'block',
            width: '26px',
          }}
          src="/search-black.svg"
          alt="검색 버튼"
        />
      </Link>
    </>
  );
}

export default SearchButton;
