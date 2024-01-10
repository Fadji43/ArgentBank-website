import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  userData: {},
  loading: false,
  error: null,
  token: null,
  rememberMe: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fetchProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      state.error = null;
    },
    fetchProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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

// Exporter les actions et le réducteur du slice
export const {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  loginSuccess,
  loginFailure,
  logout,
} = profileSlice.actions;

export default profileSlice.reducer;
