import axios from 'axios';
import { parse, stringify } from 'qs';
export const BASE_URL = 'https://becnpmm.vercel.app/api';

const token = localStorage.getItem('accessToken');
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : null, // 1. Nếu không thì dùng cái 2 cũng được
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
  (error) => {
    if (error.response.status === 401) {
      console.log('Mày chưa có token');
      console.log('Cần xử lí gọi status và data từ response ra từ axios.post(refresh token)');
      console.log('Sau đó check xem status lấy được có phải 200 hay không');
      console.log('Nếu phải thì set lại token như dòng dưới đây');
      console.log("axiosClient.defaults.headers.common['Authorization'] = 'Bearer + ${data.accessToken}'");
      console.log('Sau đó return axios(error.config)');
    }
  }
);
export default axiosClient;
