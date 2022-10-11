import { combineReducers, configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';

const reducer = combineReducers({
  modal: modalReducer,
});
const store = configureStore({
  reducer,
});

export default store;
