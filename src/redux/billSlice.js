import { createSlice } from '@reduxjs/toolkit';

const billSlice = createSlice({
  name: 'bill',
  initialState: {
    bills: [],
  },
  reducers: {
    getBills: (state, action) => ({
      ...state,
      bills: action.payload,
    }),
  },
});

export const { getBills } = billSlice.actions;

export default billSlice.reducer;
