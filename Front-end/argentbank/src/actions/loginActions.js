export const loginSuccess = (token, userData) => {
  return {
  type: 'LOGIN_SUCCESS',
  payload: { token, userData}
  }};

export const loginFailure = () => ({
  type: 'LOGIN_FAILURE',
});

export const logout = () => ({
  type: 'LOGOUT',
});
