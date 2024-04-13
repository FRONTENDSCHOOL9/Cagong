import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';

function Bookmark() {
  const axios = useCustomAxios();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_SERVER}/bookmarks/product/`)
      .then(res => {
        const items = res.data.item;
        for (let i = 0; i < items.length; i++) {
          console.log(res.data.item);
          const productNames = items.map(item => (
            <li key={item._id}>{item.product.name}</li>
          ));
          setData(productNames);
          // console.log(items[i].product.name);
          // setData(items[i].product.name);
        }
      });
  }, []);

  return (
    <div>
      <h1>찜한 카페</h1>

      {data}
    </div>
  );
}

export default Bookmark;
