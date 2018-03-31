import {
  LOAD_USER_FAILED,
  LOAD_USER_SUCCEEDED,
  LOGOUT_USER,
  LOGOUT_USER_SUCCEEDED,
  LOGOUT_USER_FAILED,
} from './../actions/types';

export const initialState = {
  error: null,
  displayName: undefined,
  externalUrls: undefined,
  followers: undefined,
  href: undefined,
  id: undefined,
  images: undefined,
  loggingOutUser: false,
  type: undefined,
  uri: undefined,
  userAuthenticated: false,
  userLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_FAILED:
      return { ...state, error: action.payload.error };
    case LOAD_USER_SUCCEEDED:
      return { ...state, ...action.payload, error: null, userLoaded: true };
    case LOGOUT_USER:
      return { ...state, loggingOutUser: true };
    case LOGOUT_USER_FAILED:
      return { ...state, error: action.payload.error, loggingOutUser: false };
    case LOGOUT_USER_SUCCEEDED:
      return { ...initialState, userLoaded: true };
    default:
      return state;
  }
}
