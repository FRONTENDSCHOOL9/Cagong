import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import styled from 'styled-components';

const SearchFormStyle = styled.div`
  width: 100%;
  height: 60px;
  min-width: 300px;

  .search-form {
    width: 100%;
    height: 60px;
    padding: 0 50px;
  }

  .search-form_input {
    border: none;
    width: 73%;
    height: 100%;
    font-family: 'NanumSquareRound';
    font-size: 0.8rem;
  }
  .search-form_button {
    position: absolute;
    z-index: 9999;
    width: 38px;
    height: 100%;
    bottom: 0px;
    top: 4px;
    right: 2px;
    border: none;
    background-color: white;
    cursor: pointer;
  }
  .search-form_button-icon {
    width: 100%;
  }
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
    setKeyword(''); // Submit 버튼 클릭 시 입력창 내용 초기화
    saveSearchHistory(keyword);
  }

  return (
    <SearchFormStyle>
      <form className="search-form">
        <input
          className="search-form_input"
          type="text"
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
