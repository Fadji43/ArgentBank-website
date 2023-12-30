import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice.js';
import profileReducer from '../slices/profileSlice.js';
//import usernameReducer from '../slices/usernameSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    //username: usernameReducer,
  },
});

export default store;
