import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useRecoilValue } from 'recoil';
import { memberState } from '@recoil/user/atoms.mjs';

BookmarkButton.propTypes = {
  cafeId: PropTypes.number,
};

function BookmarkButton({ cafeId }) {
  const axios = useCustomAxios();
  const user = useRecoilValue(memberState);
  const [isBookmarked, setIsBookmarked] = useState();
  const [bookmarkId, setBookmarkId] = useState();

  const bookmarkData = async () => {
    try {
      if (user) {
        const { data } = await axios.get(`/bookmarks/product`);
        if (data) {
          const getId = data?.item.find(
            item => item.product._id === cafeId,
          )._id;
          if (getId !== undefined) {
            setIsBookmarked(true);
            setBookmarkId(getId);
          } else {
            setIsBookmarked(false);
            setBookmarkId();
          }
        } else {
          setIsBookmarked(false);
          setBookmarkId();
        }
      }
    } catch (err) {
      console.log('북마크 데이터가 없습니다.');
      console.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    bookmarkData();
  }, []);

  const handleBookmark = async () => {
    try {
      if (!bookmarkId || bookmarkId === undefined) {
        const response = await axios.post(`/bookmarks/product/${cafeId}`);
        const data = response.data;
        console.log('북마크 추가함!');
        setIsBookmarked(true);
        setBookmarkId(data.item._id);
      } else {
        await axios.delete(`/bookmarks/${bookmarkId}`);
        console.log('북마크 삭제함!');
        setIsBookmarked(false);
        setBookmarkId();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        await axios.delete(`/bookmarks/${bookmarkId}`);
      } else {
        console.error('북마크 추가/삭제 중 오류 발생:', error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleBookmark}>
        {isBookmarked
          ? '북마크 이미 추가됨 삭제 할래?'
          : '북마크 없다. 추가 해줘!'}
      </button>
    </div>
  );
}

export default BookmarkButton;
