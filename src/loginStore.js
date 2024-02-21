import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginSuccess = () => ({ type: LOGIN_SUCCESS });

const notLoggedIn = {
  isLoggedIn: false,
};

const loginReducer = (state = notLoggedIn, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true };
    default:
      return state;
  }
};

// Wrapping the loginReducer inside an object
const rootLIReducer = combineReducers({
  login: loginReducer,
});

const loginStore = configureStore({
  reducer: rootLIReducer,
});

export default loginStore;