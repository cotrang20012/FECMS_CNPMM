import { createSlice } from '@reduxjs/toolkit';

const billSlice = createSlice({
  name: 'bill',
  initialState: {
    bill: [],
  },
  reducers: {
    getBills: (state, action) => ({
      ...state,
      bill: action.payload,
    }),
  },
});

export const { getBills } = billSlice.actions;

export default billSlice.reducer;
