import { memberState } from '@recoil/user/atoms.mjs';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const API_SERVER = import.meta.env.VITE_API_SERVER;
const REFRESH_URL = '/auth/refresh';

function useCustomAxios() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useRecoilState(memberState);

  const instance = axios.create({
    baseURL: API_SERVER,
    timeout: 1000 * 10,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      'client-id': `${import.meta.env.VITE_CLIENT_ID}`,
    },
  });

  // 요청 인터셉터
  instance.interceptors.request.use(config => {
    if (user) {
      let token = user.token.accessToken;
      if (config.url === REFRESH_URL) {
        token = user.token.refreshToken;
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // 응답 인터셉터
  instance.interceptors.response.use(
    res => res,
    async err => {
      const { config, response } = err;
      if (response?.status === 401) {
        if (!user || config.url === REFRESH_URL) {
          const gotoLogin = confirm(
            '로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?',
          );
          gotoLogin &&
            navigate('/users/login', { state: { from: location.pathname } });
        } else {
          const accessToken = await getAccessToken(instance);
          if (accessToken) {
            setUser({ ...user, token: { accessToken } });
            config.headers.Authorization = `Bearer ${accessToken}`;
            return axios(config);
          }
        }
      } else {
        return Promise.reject(err);
      }
    },
  );

  async function getAccessToken(instance) {
    try {
      const {
        data: { accessToken },
      } = await instance.get(REFRESH_URL);
      return accessToken;
    } catch (err) {
      console.error(err);
    }
  }
  return instance;
}

export default useCustomAxios;
