import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useParams } from 'react-router-dom';

function MyPage() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_SERVER}/users/${_id}`).then(res => {
      console.log(res);
      console.log(res.config.headers.Authorization);
      setUserInfo(res.data.item);
    });
  }, []);

  return (
    <div>
      {userInfo.name && (
        <div>
          <Link to="/users/reviewlist">리뷰 리스트</Link>
          <img src="/assets/byeol.jpg" alt="" />
          <p>
            {userInfo.name}님 안녕하세요! 페이지 주소는 {userInfo._id}
          </p>
          <p>카공 병아리</p>
          <h1>최근 조회한 카페</h1>
          <p>리뷰관리</p>
          <p>공지사항</p>
          <p>1:1 문의하기</p>
        </div>
      )}
    </div>
  );
}

export default MyPage;
