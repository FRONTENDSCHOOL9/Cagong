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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const user = useRecoilValue(memberState);
  const [bookmarkId, setBookmarkId] = useState(null);

  // const { data } = useQuery({
  //   queryKey: ['bookmarks', 'product'],
  //   queryFn: async () => await axios.get('/bookmarks/product'),
  //   select: response => response.data,
  //   suspense: true,
  // });

  const bookmarkData = async () => {
    try {
      if (user) {
        const { data } = await axios.get(`/bookmarks/product`);
        const getId = data?.item.find(item => item.product._id === cafeId);
        console.log(getId._id);
        if (getId) {
          console.log(getId._id);
          setBookmarkId(getId._id);
          setIsBookmarked(true);
        } else {
          console.log('Cafe ID not found in bookmarks.');
          setIsBookmarked(false);
        }
      }
    } catch (err) {
      // console.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    bookmarkData();
  }, []);

  // console.log(data.item.map(item => item._id));
  // console.log(data);

  const handleBookmark = async () => {
    if (user) {
      if (isBookmarked) {
        await axios.delete(`/bookmarks/${bookmarkId}`);
        console.log('북마크 삭제함!');
        setIsBookmarked(false);
        setBookmarkId();
      }
    } else {
      const response = await axios.post(`/bookmarks/product/${cafeId}`);
      const data = response.data;
      console.log('북마크 추가함!');
      setIsBookmarked(true);
      setBookmarkId(data.item._id);
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
