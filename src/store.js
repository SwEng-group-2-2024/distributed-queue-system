import { createStore, combineReducers } from 'redux';


const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';


export const signUpSuccess = () => ({ type: SIGN_UP_SUCCESS });


const initialState = {
  isSignedUp: false,
};


const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return { ...state, isSignedUp: true };
    default:
      return state;
  }
};


const store = createStore(signUpReducer);

export default store;
