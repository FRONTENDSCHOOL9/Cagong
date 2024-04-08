import CafeList from '@pages/board/CafeList';
import Home from '@pages/board/Home';
import Map from '@pages/board/Map';
import BookMark from '@pages/user/BookMark';
import MyPage from '@pages/user/MyPage';
import OrderList from '@pages/user/OrderList';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    // errorElement: <ErrorPage />,
    // element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/boards/cafelist',
        element: <CafeList />,
      },
      {
        path: '/boards/map',
        element: <Map />,
      },
      {
        path: '/users/orderlist',
        element: <OrderList />,
      },
      {
        path: '/users/bookmark',
        element: <BookMark />,
      },
      {
        path: '/users/mypage',
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
