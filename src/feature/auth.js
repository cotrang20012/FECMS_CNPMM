import authApi from '../apis/authApi';
export const handleLogin = async (username, password) => {
  try {
    const resp = await authApi.login(username, password);
    console.log('🚀 ~ handleLogin ~ resp', resp);
    const { accessToken, refreshToken } = resp?.data;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  } catch (error) {
    throw new Error(error);
  }
};
