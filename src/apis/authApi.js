import axiosClient from './apiClient';

class AuthApi {
  login = (username, password) => {
    const url = `/auth/loginadmin`;
    return axiosClient.post(url, { username, password });
  };
  refreshToken = (refreshToken) => {
    const url = '/auth/refreshtoken';
    return axiosClient.post(url, { refreshToken });
  };
}

const authApi = new AuthApi();
export default authApi;
