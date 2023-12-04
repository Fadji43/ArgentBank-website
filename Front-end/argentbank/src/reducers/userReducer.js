const initialState = {
  data: {}, // ou null selon votre structure
  error: null,
  username: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case 'FETCH_USER_FAILURE':
      return {
        ...state,
        data: {}, // ou null selon votre structure
        error: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
