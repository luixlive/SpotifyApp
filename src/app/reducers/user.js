import {
  LOAD_USER_SUCCEEDED,
  LOGOUT_USER_SUCCEEDED,
} from './../actions/types';

export const initialState = {
  isUserAuthenticated: false,
  loadUserFinished: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_SUCCEEDED:
      return {
        ...state,
        isUserAuthenticated: action.payload.isUserAuthenticated,
        loadUserFinished: true,
      };
    case LOGOUT_USER_SUCCEEDED:
      return { ...state, isUserAuthenticated: false };
    default:
      return state;
  }
}
