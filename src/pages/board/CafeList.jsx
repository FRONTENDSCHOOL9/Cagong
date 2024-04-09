import { Link } from 'react-router-dom';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';

function CafeList() {
  const [mainImages, setMainImages] = useState([]); // 이미지 배열 저장
  const [name, setName] = useState([]);
  const axios = useCustomAxios();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_SERVER}/products/6`).then(res => {
      console.log(res.data.item.name);
      setMainImages(res.data.item.mainImages);
      setName(res.data.item.name);
    });
  }, []);

  return (
    <>
      <h1>CafeList</h1>
      {name}

      {mainImages.length > 0 && (
        <ul>
          {mainImages.map(image => (
            <li key={image.originalname}>
              {image.name}
              <img src="{image.path}" />
            </li>
          ))}
        </ul>
      )}
      <Link to="/boards/cafedetail">cafedetail</Link>
    </>
  );
}

export default CafeList;
