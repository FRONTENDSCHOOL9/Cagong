import Header from '@components/layout/Header';
import Navbar from '@components/layout/Navbar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Navbar />
    </div>
  );
}

export default Layout;
