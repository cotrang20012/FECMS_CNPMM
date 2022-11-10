import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    admin: {},
  },
  reducers: {
    setAdmin: (state, action) => {
      return { ...state, admin: action.payload };
    },
  },
});

export const authSelector = (state) => state.auth;

export const { setAdmin } = authSlice.actions;

export default authSlice.reducer;
