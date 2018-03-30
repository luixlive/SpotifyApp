import {
  LOAD_USER_FAILED,
  LOAD_USER_SUCCEEDED,
  LOGOUT_USER,
  LOGOUT_USER_SUCCEEDED,
} from './../actions/types';

export const initialState = {
  isUserAuthenticated: false,
  userLoaded: false,
  loggingOutUser: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_FAILED:
      return { ...state, userLoaded: true };
    case LOAD_USER_SUCCEEDED:
      return { ...state, ...action.payload, userLoaded: true };
    case LOGOUT_USER:
      return { ...state, loggingOutUser: true };
    case LOGOUT_USER_SUCCEEDED:
      return { ...state, isUserAuthenticated: false, loggingOutUser: false };
    default:
      return state;
  }
}
