import { Link } from 'react-router-dom';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { memberState } from '@recoil/user/atoms.mjs';
import { useRecoilValue } from 'recoil';
import Bookmark from '@pages/user/Bookmark';

const MyComponent = styled.div`
  width: 100%;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  h1 {
    margin: 0;
    padding: 0;

    text-align: center;
  }
  img {
    margin: 0;
    padding: 0;
  }

  .cafe-thumb {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    aspect-ratio: 1/1;
  }

  a {
    text-decoration: none;
  }
`;

function CafeList() {
  const [data, setData] = useState([]);
  const axios = useCustomAxios();
  // const user = useRecoilValue(memberState);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_SERVER}/products`).then(res => {
      const items = res.data.item;
      for (let i = 0; i < items.length; i++) {
        setData(items);
      }
    });
  }, []);

  return (
    <>
      <MyComponent className="cafelist">
        <h1 className="title">카공 인기카페</h1>
        <ul>
          {data.map(item => (
            <li key={item._id}>
              <Bookmark />
              <Link key={item._id} to={`/boards/cafeDetail/${item._id}`}>
                <div>
                  <img
                    className="cafe-thumb"
                    src={
                      import.meta.env.VITE_API_SERVER +
                      '/files/05-cagong/' +
                      item.mainImages[0].name
                    }
                    alt="카페사진"
                  />
                </div>
                {item.name}
                <div>{item.extra.address}</div>
                <div>
                  <img src="../public/stars.svg" />
                  리뷰 {item.replies}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </MyComponent>
    </>
  );
}

export default CafeList;
