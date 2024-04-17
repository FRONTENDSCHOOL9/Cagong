import Layout from '@components/layout';
import AskLogin from '@pages/AskLogin';
import ErrorPage from '@pages/ErrorPage';
import CafeDetail from '@pages/board/CafeDetail';
import CafeList from '@pages/board/CafeList';
import Home from '@pages/board/Home';
import Map from '@pages/board/Map';
import ReviewForm from '@pages/board/ReviewForm';
import ReviewList from '@pages/board/ReviewList';
import Search from '@pages/board/Search';
import CreateProductForm from '@pages/seller/CreateProductForm';
import StoreList from '@pages/seller/StoreList';
import Bookmark from '@pages/user/Bookmark';
import Login from '@pages/user/Login';
import MyPage from '@pages/user/MyPage';
import OrderList from '@pages/user/OrderList';
import Signup from '@pages/user/Signup';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Layout />,
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
        path: '/boards/cafedetail/:_id',
        element: <CafeDetail />,
      },
      {
        path: '/boards/reviewform/:reviewId',
        element: <ReviewForm />,
      },
      {
        path: '/users/orderlist',
        element: <OrderList />,
      },
      {
        path: '/users/bookmark',
        element: <Bookmark />,
      },
      {
        path: '/users/mypage',
        element: <MyPage />,
      },
      {
        path: '/users/signup',
        element: <Signup />,
      },
      {
        path: '/users/login',
        element: <Login />,
      },
      {
        path: '/asklogin',
        element: <AskLogin />,
      },
      {
        path: '/users/reviewlist',
        element: <ReviewList />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/sellers/storelist',
        element: <StoreList />,
      },
      {
        path: '/sellers/createproductform',
        element: <CreateProductForm />,
      },
    ],
  },
]);

export default router;
