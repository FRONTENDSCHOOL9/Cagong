import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import styled from 'styled-components';

const SearchFormStyle = styled.div`
  width: 100%;
  height: 60px;
  min-width: 300px;

  .search-form {
    display: flex;
    align-items: center;
    width: 90%;
    height: 60px;
  }

  .search-form_input {
    font-family: 'NanumSquareRound';
    border: none;
    min-width: 50%;
    width: 100%;
    height: 95%;
    margin-left: 10px;
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
    width:40px;
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
  //디바운스 기능을 가지고 있는 함수를 담음
  const onDebounceChange = e => {
    // setText(e.target.value);
    // setKeyword(e.target.value);
    // onClick(e.target.value);
    debouncedSearch(e.target.value);
  };
  // console.log(text + 'text');
  // console.log(keyword + 'keyword');
  //lodash를 사용하여 디바운싱
  const debouncedSearch = useMemo(
    () =>
      debounce(text => {
        setText(text);
        setKeyword(text); //Keyword 변수에 text 변수 값 담기
        onClick(keyword); // 검색 함수 호출
      }, 500),
    [text],
  );

  function handleSubmit(e) {
    e.preventDefault();
    onClick(keyword); // 검색 함수 호출
    saveSearchHistory(keyword);
  }

  return (
    <SearchFormStyle>
      <form className="search-form">
        <input
          className="search-form_input"
          type="text"
          maxLength={20}
          autoFocus
          onInput={onDebounceChange}
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
