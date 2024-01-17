// profileAndUsernameSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  userName: '',
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
      state.userName = action.payload.userData.body.userName;
      state.token = action.payload.token;
      state.error = null;
    },
    fetchProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUsernameRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUsernameSuccess: (state, action) => {
      state.loading = false;
      state.userName = action.payload.userData.body.userName;
      state.error = null;
    },
    updateUsernameFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateUsernameRequest,
  updateUsernameSuccess,
  updateUsernameFailure,
} = profileSlice.actions;

export default profileSlice.reducer;
