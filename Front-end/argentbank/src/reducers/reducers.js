import { combineReducers } from 'redux';
import authReducer from './authReducers.js';
import userNameReducer from '../reducers/userNameReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  userName: userNameReducer,
});

export default rootReducer;
