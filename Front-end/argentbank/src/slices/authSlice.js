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
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
