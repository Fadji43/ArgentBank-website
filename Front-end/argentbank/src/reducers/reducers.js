const initialState = {
  user: {
    data: {},
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_DATA_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          data: action.payload,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
