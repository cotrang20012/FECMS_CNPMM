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
    const url = `admin/user/getuserinfo`;
    return axiosClient.post(url, { userId });
  };
  updateActive = (userId) => {
    const url = `admin/user/active`;
    return axiosClient.put(url, { userId });
  };
  updateInActive = (userId) => {
    const url = `admin/user/inactive`;
    return axiosClient.put(url, { userId });
  };
  deleteUsers = (userId) => {
    const url = `admin/user/deleteaccount`;
    return axiosClient.post(url, { userId });
  };
}

const userApi = new UserApi();
export default userApi;
