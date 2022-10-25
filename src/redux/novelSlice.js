import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chapterNumber: 0,
  novelNumber: 0,
};
const novelSlice = createSlice({
  name: 'novel',
  initialState,

  reducers: {
    countChapter: (state, action) => ({
      ...state,
      chapterNumber: action.payload,
    }),
    countNovel: (state, action) => ({
      ...state,
      novelNumber: action.payload,
    }),
  },
});
export const { countChapter, countNovel } = novelSlice.actions;

export default novelSlice.reducer;
