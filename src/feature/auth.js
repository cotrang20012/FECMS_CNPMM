import { useDispatch } from 'react-redux';
import authApi from '../apis/authApi';

export const handleLogin = async (username, password) => {
  try {
    const resp = await authApi.login(username, password);
    const { accessToken, refreshToken } = resp?.data;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
    return resp?.data;
  } catch (error) {
    throw new Error(error);
  }
};
