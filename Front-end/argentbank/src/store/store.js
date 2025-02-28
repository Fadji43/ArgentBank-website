import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice.js';
import profileReducer from '../slices/profileSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
