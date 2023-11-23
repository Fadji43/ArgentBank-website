import { combineReducers } from 'redux';
import authReducer from './authReducers.js';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
