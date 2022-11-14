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
  getUserById = (userId) => {
    const url = `user/getuserinfo`;
    return axiosClient.get(url, { userId });
  };
  deleteUsers = (userId) => {
    const url = `admin/user/deleteaccount`;
    return axiosClient.post(url, { userId });
  };
}

const userApi = new UserApi();
export default userApi;
