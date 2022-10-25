import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userNumber: 0,
};
const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    countUser: (state, action) => ({
      ...state,
      userNumber: action.payload,
    }),
  },
});
export const { countUser } = userSlice.actions;

export default userSlice.reducer;
