export const UPDATE_USERNAME_REQUEST = 'UPDATE_USERNAME_REQUEST';
export const UPDATE_USERNAME_SUCCESS = 'UPDATE_USERNAME_SUCCESS';
export const UPDATE_USERNAME_FAILURE = 'UPDATE_USERNAME_FAILURE';


export const updateUsernameRequest = () => ({
  type: UPDATE_USERNAME_REQUEST,
});

export const updateUsernameSuccess = (newUsername) => ({
  type: UPDATE_USERNAME_SUCCESS,
  payload: newUsername,
});

export const updateUsernameFailure = (error) => ({
  type: UPDATE_USERNAME_FAILURE,
  payload: error,
});


export const updateUsername = (newUsername) => {
  return async (dispatch) => {
    dispatch(updateUsernameRequest());

    try {
      dispatch(updateUsernameSuccess(newUsername));
    } catch (error) {
      dispatch(updateUsernameFailure(error.message));
    }
  };
};
