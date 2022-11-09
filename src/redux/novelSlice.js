import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chapterNumber: 0,
  novelNumber: 0,
  novels: [],
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
    getNovels: (state, action) => ({
      ...state,
      novels: action.payload,
    }),
  },
});
export const { countChapter, countNovel, getNovels } = novelSlice.actions;

export default novelSlice.reducer;
