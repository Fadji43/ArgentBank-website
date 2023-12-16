import { combineReducers } from 'redux';
import loginReducer from './loginReducer.js';
import profileReducer from './profileReducer.js';
import tokenReducer from './tokenReducer.js';

const rootReducer = combineReducers({
  auth: loginReducer,
  profile: profileReducer,
  token: tokenReducer,
});

export default rootReducer;
