import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  loading: false,
  error: null,
  token: null,
};

const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    updateUsernameRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUsernameSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload.userData;
      //state.token = action.payload.token;
      state.error = null;
    },
    updateUsernameFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUsername: (state, action) => {
      // Assurez-vous que action.payload est un objet avec une propriété 'loading'
      state.loading = action.payload.loading;
      state.error = action.payload.error;
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },
  },
});

export const {
  updateUsernameRequest,
  updateUsernameSuccess,
  updateUsernameFailure,
  setUsername,
} = usernameSlice.actions;

export default usernameSlice.reducer;
