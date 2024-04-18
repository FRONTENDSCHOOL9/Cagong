import Layout from '@components/layout';
import ErrorPage from '@pages/ErrorPage';
import Bookmark from '@pages/bookmark/Bookmark';
import Home from '@pages/home/Home';
import AskLogin from '@pages/login/AskLogin';
import Login from '@pages/login/Login';
import Map from '@pages/map/Map';
import MyPage from '@pages/mypage/MyPage';
import CafeDetail from '@pages/product/CafeDetail';
import CafeList from '@pages/product/CafeList';
import OrderList from '@pages/product/OrderList';
import ReviewForm from '@pages/review/ReviewForm';
import ReviewList from '@pages/review/ReviewList';
import Search from '@pages/search/Search';
import Signup from '@pages/signup/Signup';
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
    ],
  },
]);

export default router;
