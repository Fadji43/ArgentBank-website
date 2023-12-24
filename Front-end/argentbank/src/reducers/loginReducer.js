const initialState = {
  token: null,
  type: null,
  isAuthenticated: false,
};

export const loginReducer = (state = initialState) => {
  switch (state?.payload?.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: state.payload.token,
        isAuthenticated: true,
      };

    case 'LOGIN_FAILURE':
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default loginReducer;

