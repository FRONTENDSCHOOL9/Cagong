import { useState, useEffect } from 'react';
import { memberState } from '@recoil/user/atoms.mjs';
import { useRecoilValue } from 'recoil';

import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function MyPage() {
  const axios = useCustomAxios();
  const user = useRecoilValue(memberState);

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('/products'),
    select: response => response.data,
    suspense: true,
  });
  // console.log(data.item[0]._id);

  const [viewedCafes, setViewedCafes] = useState([]);

  useEffect(() => {
    // localStorage에서 저장된 최근 조회한 카페 id
    const storedViewedCafes = localStorage.getItem('viewedCafeIds');

    // 저장된 id로 상태 업데이트
    if (storedViewedCafes) {
      setViewedCafes(JSON.parse(storedViewedCafes));
    }
  }, []);
  // console.log([...viewedCafes].reverse()); //로컬 스토리지의 id 배열 뒤집기

  const BASE_IMAGE_URL = `${import.meta.env.VITE_API_SERVER}/files/05-cagong/`;

  return (
    <div>
      <text>Mypage</text>
      {user && <div>정보</div>}
      {user.name}
      <div className="cafelist-title">최근 조회한 카페</div>

      {viewedCafes.map(item =>
        data.item.map(cafe =>
          cafe._id === parseInt(item) ? (
            <Link to={`/boards/cafeDetail/${cafe._id}`} key={cafe._id}>
              <img
                src={`${BASE_IMAGE_URL}` + cafe.mainImages[0].name}
                alt={cafe.name}
              />
              <h3>{cafe.name}</h3>
              <span>{cafe.extra.address}</span>
            </Link>
          ) : null,
        ),
      )}
    </div>
  );
}

export default MyPage;
