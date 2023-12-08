import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
  } from '../actions/profileActions';
  
  const initialState = {
    userData: {},
    loading: false,
    error: null,
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PROFILE_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_PROFILE_SUCCESS:
        return { ...state, loading: false, userData: action.payload, error: null };
      case FETCH_PROFILE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default profileReducer;