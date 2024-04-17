import Header from '@components/layout/Header';
import Navbar from '@components/layout/Navbar';
import { Outlet } from 'react-router-dom';
import Wrapper from '@/Wrapper.jsx';
function Layout() {
  return (
    <div>
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Navbar />
    </div>
  );
}

export default Layout;
