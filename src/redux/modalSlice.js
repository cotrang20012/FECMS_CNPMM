import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    type: '',
    id: -1,
  },
  reducers: {
    handleOpenModal: (state, action) => ({
      ...state,
      isModalOpen: true,
      type: action.payload?.type,
      id: action.payload?.id,
    }),
    handleCloseModal: (state) => ({ ...state, isModalOpen: false, type: '', id: -1 }),
  },
});

export const { handleCloseModal, handleOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
