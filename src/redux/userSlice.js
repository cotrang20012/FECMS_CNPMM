import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  userNumber: 0,
  users: [],
};
const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    countUser: (state, action) => ({
      ...state,
      userNumber: action.payload,
    }),
    getUsers: (state, { payload }) => {
      const userData = payload;
      return { ...state, users: userData };
    },
  },
});
export const { countUser, getUsers } = userSlice.actions;

export default userSlice.reducer;
