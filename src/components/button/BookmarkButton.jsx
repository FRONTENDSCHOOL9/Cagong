import PropTypes from 'prop-types';
import { useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useRecoilState } from 'recoil';
import { bookmarkAtoms } from '@recoil/user/bookmarkAtoms.mjs';

BookmarkButton.propTypes = {
  productId: PropTypes.number.isRequired,
};

function BookmarkButton({ productId }) {
  const axios = useCustomAxios();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [getMarkedId, setMarkedId] = useRecoilState(bookmarkAtoms);

  const handleBookmark = async () => {
    if (isBookmarked) {
      console.log(getMarkedId);
      const res = await axios.delete(`/bookmarks/${markedId}`);
      console.log(res.data);
      setIsBookmarked(!isBookmarked);
    } else {
      const res = await axios.post(`/bookmarks/product/${productId}`);
      console.log(res.data);
      setIsBookmarked(!isBookmarked);
      setMarkedId(res.data.item._id);
      console.log(res.data.item._id);
      console.log(getMarkedId);
    }
  };

  return (
    <div>
      <button onClick={handleBookmark}>
        {isBookmarked
          ? '북마크 이미 추가됨 삭제 할래?'
          : '북마크 없다. 추가 해줘!'}
      </button>
      {getMarkedId}
    </div>
  );
}

export default BookmarkButton;
