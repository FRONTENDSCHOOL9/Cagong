import { useEffect, useState } from 'react';

function Bookmark(props) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  let variable = { userTo };

  useEffect(() => {
    const bookmarkedVariable = {
      userTo: props.userTo,
      userFrom: 
    };
    const handleBookmark = async product_id => {
      await axios
        .post(
          '${import.meta.env.VITE_API_SERVER}/bookmarks/product/product_id',
          variable,
        )
        .then(res => {
          console.log(res.data);
        });
    };
  });
  return (
    <>
      <button>북마크</button>
    </>
  );
}

export default Bookmark;
