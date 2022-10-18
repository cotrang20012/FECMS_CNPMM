import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    content: '',
    isModalOpen: false,
  },
  reducers: {
    handleOpenModal: (state, { payload }) => ({ ...state, isModalOpen: true, content: payload }),
    handleCloseModal: (state) => ({ ...state, isModalOpen: false, content: '' }),
  },
});

export const { handleCloseModal, handleOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
