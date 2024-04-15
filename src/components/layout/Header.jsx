import Button from '@components/button/Button';
import PrevButton from '@components/button/PrevButton';
import SearchButton from '@components/button/SearchButton';
import { memberState } from '@recoil/user/atoms.mjs';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };
  const [user, setUser] = useRecoilState(memberState);

  return (
    <>
      <span>logo</span>
      <PrevButton />
      <SearchButton />
      <div>
        {user ? (
          <Button size="sm" onClick={handleLogout}>
            로그아웃
          </Button>
        ) : null}
      </div>
    </>
  );
}

export default Header;
