import {
  LOAD_USER_STATS_SUCCEEDED,
} from './../actions/types';

export const initialState = { statsLoaded: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_STATS_SUCCEEDED:
      return { ...state, statsLoaded: true };
    default:
      return state;
  }
}
