// authReducer.js
const initialState = {
    token: null,
    isAuthenticated: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          token: action.payload.token,
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
  
  export default authReducer;
  