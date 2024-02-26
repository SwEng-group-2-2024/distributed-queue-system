import { createStore } from 'redux';


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


const store = createStore(loginReducer);

export default store;