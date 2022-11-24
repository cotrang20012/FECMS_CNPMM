import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { parse, stringify } from 'qs';
import authApi from './authApi';
export const BASE_URL = 'https://becnpmm.vercel.app/api';
//export const BASE_URL = 'http://localhost:5000/api';

const defaulToken = localStorage.getItem('accessToken');
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: defaulToken ? `Bearer ${defaulToken}` : null, // 1. Nếu không thì dùng cái 2 cũng được
  },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});
// axiosClient.defaults.headers.common['Authorization'] = `Bearer + ${token}` || null; 2. Đây là cách 2
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      const refreshToken = localStorage.getItem('refreshToken');
      const accessToken = localStorage.getItem('accessToken');
      const decoded_token = jwtDecode(accessToken);
      if (refreshToken && Math.floor(decoded_token?.exp / 1000) < new Date().getTime()) {
        const resp = await authApi.refreshToken(refreshToken);
        const newAccessToken = resp?.data?.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        axiosClient.defaults.headers.common['Authorization'] = `Bearer + ${newAccessToken}` || null;
        console.log('Reset Token thành công');
        window.location.reload();
      }
    }
  }
);
// axiosClient.interceptors.request.use(
//   (config) => {
//     // axiosClient.defaults.headers.common['Authorization'] = `Bearer + ${token}` || null;
//     const accessToken = localStorage.getItem('accessToken');
//     if (!accessToken) {
//       return {
//         ...config,
//         headers: {
//           ...config.headers,
//           Authorization: `Bearer + ${accessToken}`,
//         },
//       };
//     }
//   },
//   (error) => {
//     throw error;
//   }
// );
export default axiosClient;
