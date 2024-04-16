import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useRecoilValue } from 'recoil';
import { memberState } from '@recoil/user/atoms.mjs';
import { useQuery } from '@tanstack/react-query';

BookmarkButton.propTypes = {
  cafeId: PropTypes.number,
};

function BookmarkButton({ cafeId }) {
  const axios = useCustomAxios();
  const user = useRecoilValue(memberState);
  const [isBookmarked, setIsBookmarked] = useState();
  const [bookmarkId, setBookmarkId] = useState();
  const [loading, setLoading] = useState(true); // 북마크 데이터 로딩 상태 추가

  const { data: bookmarkData } = useQuery({
    queryKey: ['isBookmarkedlist'],
    queryFn: () => axios.get('/bookmarks/product'),
    select: response => response.data.item || [],
  });

  useEffect(() => {
    if (bookmarkData && user) {
      const getId = bookmarkData.find(item => item.product._id === cafeId)?._id;
      setIsBookmarked(!!getId);
      setBookmarkId(getId);
      setLoading(false);
    }
  }, []);

  const handleBookmark = async () => {
    try {
      if (!bookmarkId) {
        const response = await axios.post(`/bookmarks/product/${cafeId}`);
        const data = response.data;
        console.log('북마크 추가됨!');
        setBookmarkId(data.item._id);
        setIsBookmarked(true);
      } else {
        await axios.delete(`/bookmarks/${bookmarkId}`);
        console.log('북마크 삭제됨!');
        setBookmarkId();
        setIsBookmarked(false);
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
      {loading ? (
        <button>북마크 로딩중</button> // 로딩 중일 때 표시할 메시지
      ) : (
        <button onClick={handleBookmark}>
          {isBookmarked ? '북마크 있당' : '북마크 추가할래?'}
        </button>
      )}
    </div>
  );
}

export default BookmarkButton;
