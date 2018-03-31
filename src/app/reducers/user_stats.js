import {
  LOAD_USER_STATS_SUCCEEDED,
  LOAD_USER_STATS_FAILED,
} from './../actions/types';

export const initialState = {
  error: null,
  statsLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_STATS_FAILED:
      return { ...state, error: action.payload.error };
    case LOAD_USER_STATS_SUCCEEDED:
      return { ...state, statsLoaded: true };
    default:
      return state;
  }
}
