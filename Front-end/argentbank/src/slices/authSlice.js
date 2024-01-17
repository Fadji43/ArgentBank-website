import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.rememberMe = action.payload.rememberMe || false;

      if (state.rememberMe) {
        localStorage.setItem('authToken', action.payload.token);
      }
    },
      loginSuccess: (state, action) => {
        state.token = action.payload.token;
        state.userData = action.payload.userData;
        state.rememberMe = action.payload.rememberMe || false;
  
        if (state.rememberMe) {
          localStorage.setItem('authToken', action.payload.token);
        }
      },
      loginFailure: (state) => {
        state.token = null;
        state.userData = {};
      },
      logout: (state) => {
        state.token = null;
        state.userData = {};
        state.rememberMe = false;
        localStorage.removeItem('authToken'); 
      },
    },
  });
  
  export const {
    setToken,
    loginSuccess,
    loginFailure,
    logout,
  } = authSlice.actions;

export default authSlice.reducer;
