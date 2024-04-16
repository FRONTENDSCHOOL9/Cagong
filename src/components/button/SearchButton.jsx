import { Link } from 'react-router-dom';

function SearchButton() {
  return (
    <>
      <Link to="/search"><img src="../public/search-white.svg" alt="검색 버튼" /></Link>
    </>
  );
}

export default SearchButton;
