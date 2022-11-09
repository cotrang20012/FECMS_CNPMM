import { combineReducers, configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import novelReducer from './novelSlice';
import userReducer from './userSlice';
import billReducer from './billSlice';
const reducer = combineReducers({
  modal: modalReducer,
  novel: novelReducer,
  user: userReducer,
  bill: billReducer,
});
const store = configureStore({
  reducer,
});

export default store;
