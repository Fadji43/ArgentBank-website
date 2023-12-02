import { combineReducers } from 'redux';
import authReducer from './authReducers.js';
import userNameReducer from './userNameReducer.js';
import userReducer from './userReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  userName: userNameReducer,
  user: userReducer,
});

export default rootReducer;
