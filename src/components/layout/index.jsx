import Navbar from '@components/layout/Navbar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <Outlet />
      <Navbar />
    </div>
  );
}

export default Layout;
