import { combineReducers } from 'redux';
import loginReducer from './loginReducer.js';
import profileReducer from './profileReducer.js';

const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
});

export default rootReducer;
