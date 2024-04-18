import { Link } from 'react-router-dom';

function SearchButton() {
  return (
    <>
      <Link to="/search"><img style={{width: "30px"}} src="/public/search-black.svg" alt="검색 버튼" /></Link>
    </>
  );
}

export default SearchButton;
