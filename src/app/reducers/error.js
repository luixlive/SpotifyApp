import {
  CLEAR_ERROR,
  KEEP_SESSION_ALIVE_FAILED,
  LOAD_USER_FAILED,
  LOAD_USER_STATS_FAILED,
  LOGOUT_USER_FAILED,
} from './../actions/types';

export const initialState = '';

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERROR:
      return '';
    case KEEP_SESSION_ALIVE_FAILED:
    case LOAD_USER_FAILED:
    case LOAD_USER_STATS_FAILED:
    case LOGOUT_USER_FAILED:
      return action.payload.error;
    default:
      return state;
  }
}
