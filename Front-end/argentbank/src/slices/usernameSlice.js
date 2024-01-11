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
      state.error = null;
    },
    updateUsernameFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    },
  },
);

export const {
  updateUsernameRequest,
  updateUsernameSuccess,
  updateUsernameFailure,
} = usernameSlice.actions;

export default usernameSlice.reducer;
