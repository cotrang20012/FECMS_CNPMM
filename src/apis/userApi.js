import axiosClient from './apiClient';
class UserApi {
  getCountAccount = () => {
    const url = `/statistic/countAccounts`;
    return axiosClient.get(url);
  };
  getUsers = () => {
    const url = `admin/users/getlistusers`;
    return axiosClient.get(url);
  };
  deleteUsers = (userId) => {
    const url = `admin/user/deleteaccount`;
    return axiosClient.post(url, { userId });
  };
}

const userApi = new UserApi();
export default userApi;
