import { combineReducers, configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import novelReducer from './novelSlice';
import userReducer from './userSlice';
const reducer = combineReducers({
  modal: modalReducer,
  novel: novelReducer,
  user: userReducer,
});
const store = configureStore({
  reducer,
});

export default store;
