// profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Définir l'état initial
const initialState = {
  userData: {},
  loading: false,
  error: null,
  token: null,
};

// Créer un slice
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
    },
    loginFailure: (state) => {
      state.token = null;
      state.userData = {};
    },
    logout: (state) => {
      state.token = null;
      state.userData = {};
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
