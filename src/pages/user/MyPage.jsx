import { memberState } from '@recoil/user/atoms.mjs';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';

function MyPage() {
  const user = useRecoilValue(memberState);
  console.log(user);

  return (
    <div>
      <text>Mypage</text>
      {user && <div>정보</div>}
    </div>
  );
}

export default MyPage;
