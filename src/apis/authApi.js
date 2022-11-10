import axiosClient from './apiClient';

class AuthApi {
  login = (username, password) => {
    const url = `/auth/loginadmin`;
    return axiosClient.post(url, { username, password });
  };
}

const authApi = new AuthApi();
export default authApi;
