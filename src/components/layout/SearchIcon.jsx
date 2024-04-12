import Submit from '@components/Submit';
import { useState } from 'react';
import PropTypes from 'prop-types';

SearchIcon.propTypes = {
  onClick: PropTypes.func,
};

function SearchIcon({ onClick }) {
  const [keyword, setKeyword] = useState('');

  function handleChange(e) {
    setKeyword(e.target.value); //Keyword 변수에 입력한 값 담기
  }
  function handleSubmit(e) {
    e.preventDefault(); // 기본적인 form 제출 방지
    onClick(keyword); // 검색 함수 호출
    setKeyword(''); // Submit 버튼 클릭 시 입력창 내용 초기화
  }
  return (
    <form>
      <input
        type="text"
        autoFocus
        value={keyword}
        onChange={handleChange}
        placeholder="카페명을 입력해주세요."
      />
      <Submit onClick={handleSubmit}>🔍</Submit>
    </form>
  );
}

export default SearchIcon;
