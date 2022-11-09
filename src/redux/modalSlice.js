import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    type: '',
  },
  reducers: {
    handleOpenModal: (state, action) => ({ ...state, isModalOpen: true, type: action.payload?.type }),
    handleCloseModal: (state) => ({ ...state, isModalOpen: false, type: '' }),
  },
});

export const { handleCloseModal, handleOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
