import Submit from '@components/Submit';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

SearchIcon.propTypes = {
  onClick: PropTypes.func,
};

function SearchIcon({ onClick }) {
  const [text, setText] = useState('');
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

  //디바운스 기능을 가지고 있는 함수를 담음
  const onDebounceChange = e => {
    const value = e.target.value;
    setText(value);
    debounceSomethingFunc(e);
  };

  //lodash를 사용하여 디바운싱
  const debounceSomethingFunc = debounce(e => {
    onClick(keyword); // 검색 함수 호출 (추후 다시 구현)
    setKeyword(e.target.value); //Keyword 변수에 입력한 값 담기
  }, 1000);

  function handleSubmit(e) {
    e.preventDefault();
    onClick(keyword); // 검색 함수 호출
    setKeyword(''); // Submit 버튼 클릭 시 입력창 내용 초기화
    saveSearchHistory(keyword);
  }

  return (
    <form>
      <input
        type="text"
        autoFocus
        value={text}
        onChange={onDebounceChange}
        placeholder="카페명을 입력해주세요."
      />
      <Submit onClick={handleSubmit}>🔍</Submit>
    </form>
  );
}

export default SearchIcon;
