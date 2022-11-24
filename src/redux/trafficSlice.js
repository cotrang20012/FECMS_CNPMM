import { createSlice } from '@reduxjs/toolkit';

const trafficSlice = createSlice({
  name: 'traffic',
  initialState: {
    traffics: [],
  },
  reducers: {
    setTraffics: (state, action) => ({
      ...state,
      traffics: action.payload,
    }),
  },
});

export const { setTraffics } =trafficSlice.actions;

export default trafficSlice.reducer;
