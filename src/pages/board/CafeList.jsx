import { Link } from 'react-router-dom';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';

function CafeList() {
  const [data, setData] = useState([]);
  const axios = useCustomAxios();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_SERVER}/products`).then(res => {
      // console.log(res.data.item);
      const items = res.data.item;
      for (let i = 0; i < items.length; i++) {
        console.log(items[i].mainImages);
        setData(items);
      }
    });
  }, []);

  return (
    <>
      <h1>카공 인기카페</h1>
      <ul>
        {data.map(item => (
          <li key={item._id}>
            <div>
              <img
                src={
                  import.meta.env.VITE_API_SERVER +
                  '/files/05-cagong/' +
                  item.mainImages[0].name
                }
                alt="카페사진"
              />
            </div>
            <Link to={`/boards/cafeDetail/${item._id}`}>{item.name}</Link>
            {item.content}
            <div>{item.bookmarks}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CafeList;
