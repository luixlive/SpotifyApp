import {
  LOAD_USER_SUCCEEDED,
  LOGOUT_USER,
  LOGOUT_USER_SUCCEEDED,
  LOGOUT_USER_FAILED,
} from './../actions/types';

export const initialState = {
  account: {
    displayName: undefined,
    externalUrls: undefined,
    followers: undefined,
    href: undefined,
    id: undefined,
    images: undefined,
    type: undefined,
    uri: undefined,
  },
  loggingOutUser: false,
  userAuthenticated: false,
  userLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_SUCCEEDED:
      return {
        ...state,
        profile: action.payload.profile,
        userAuthenticated: action.payload.userAuthenticated,
        userLoaded: true,
      };
    case LOGOUT_USER:
      return { ...state, loggingOutUser: true };
    case LOGOUT_USER_FAILED:
      return { ...state, loggingOutUser: false };
    case LOGOUT_USER_SUCCEEDED:
      return { ...initialState, userLoaded: true };
    default:
      return state;
  }
}
