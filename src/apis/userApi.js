import axiosClient from './apiClient';
class UserApi {
  getCountAccount = () => {
    const url = `/statistic/countAccounts`;
    return axiosClient.get(url);
  };
}

const userApi = new UserApi();
export default userApi;
