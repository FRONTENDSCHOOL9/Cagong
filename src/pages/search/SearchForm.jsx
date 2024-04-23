import { useState } from 'react';
import PropTypes from 'prop-types';
// import { debounce } from 'lodash';
import styled from 'styled-components';

const SearchFormStyle = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  height: 60px;
  
  .search-form {
    height: 60px;
  }

  .search-form_input {
    font-family: 'NanumSquareRound';
    border: none;
    width: 100%;
    height: 95%;
    font-size: 0.8rem;
    outline:none;
  }

  .search-form_button {
    position: absolute;
    z-index: 9999;
    width: 38px;
    height: 90%;
    bottom: 0px;
    top: 4px;
    right: 2px;
    border: none;
    background-color: white;
    cursor: pointer;
  }

  .search-form_button-icon {
    display:block;
    width: 100%;
  }
  &::after {
    content:'';
    display:block;
    position:absolute;
    z-index: 9998;
    right: 0;
    top:0;
    width:50px;
    height:50px;
    background-color:white;
`;
SearchIcon.propTypes = {
  onClick: PropTypes.func,
};

function SearchIcon({ onClick }) {
  const [keyword, setKeyword] = useState('');
  //검색기록 저장 함수
  function saveSearchHistory(keyword) {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return; // 빈 값은 저장하지 않음

    const currentHistory = JSON.parse(
      sessionStorage.getItem('searchHistory') || '[]',
    );
    const newHistory = [...new Set([keyword, ...currentHistory])]; //중복 제거
    sessionStorage.setItem('searchHistory', JSON.stringify(newHistory));
  }

  const [text, setText] = useState('');
  const handleChange = e => {
    setKeyword(e.target.value); //Keyword 변수에 입력한 값 담기
    setText(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onClick(keyword); // 검색 함수 호출
    saveSearchHistory(keyword);
    setText('');
  }

  return (
    <SearchFormStyle>
      <form className="search-form">
        <input
          className="search-form_input"
          type="text"
          maxLength={20}
          autoFocus
          value={text}
          onChange={handleChange}
          placeholder="카페명을 입력해주세요."
        />
        <button
          className="search-form_button"
          type="submit"
          onClick={handleSubmit}
        >
          <img
            className="search-form_button-icon"
            src="/search-black.svg"
            alt="검색 버튼"
          />
        </button>
      </form>
    </SearchFormStyle>
  );
}

export default SearchIcon;
