import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginSuccess = () => ({ type: LOGIN_SUCCESS });

const initialState = {
  isLoggedIn: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true };
    default:
      return state;
  }
};

// Wrapping the loginReducer inside an object
const rootReducer = combineReducers({
  login: loginReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
