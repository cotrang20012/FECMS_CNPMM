import { combineReducers, configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import novelReducer from './novelSlice';
import userReducer from './userSlice';
import billReducer from './billSlice';
import authReducer from './authSlice';
const reducer = combineReducers({
  modal: modalReducer,
  novel: novelReducer,
  user: userReducer,
  bill: billReducer,
  auth: authReducer,
});
const store = configureStore({
  reducer,
});

export default store;
