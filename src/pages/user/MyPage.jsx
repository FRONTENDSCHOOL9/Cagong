import { useState, useEffect } from 'react';
import { memberState } from '@recoil/user/atoms.mjs';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { Link } from 'react-router-dom';
import CafeListItem from '@pages/board/CafeListItem';
import { useQuery } from '@tanstack/react-query';

function MyPage() {
  const axios = useCustomAxios();
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('/products'),
    select: response => response.data,
    suspense: true,
  });
  console.log(data.item[0].name);

  const user = useRecoilValue(memberState);

  const [viewedCafes, setViewedCafes] = useState([]);

  useEffect(() => {
    // localStorage에서 저장된 최근 조회한 카페 id
    const storedViewedCafes = localStorage.getItem('viewedCafeIds');

    // 저장된 id로 상태 업데이트
    if (storedViewedCafes) {
      setViewedCafes(JSON.parse(storedViewedCafes));
    }
  }, []);

  return (
    <div>
      <text>Mypage</text>
      {user && <div>정보</div>}
      {user.name}
      <div className="cafelist-title">최근 조회한 카페</div>
    </div>
  );
}

export default MyPage;
