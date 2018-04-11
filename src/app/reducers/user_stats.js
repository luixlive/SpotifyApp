import {
  LOAD_USER_STATS_FINISHED,
  LOAD_USER_STATS_TOP_ARTISTS_SUCCEEDED,
  LOAD_USER_STATS_TOP_ARTISTS_FAILED,
  LOAD_USER_STATS_TOP_TRACKS_SUCCEEDED,
  LOAD_USER_STATS_TOP_TRACKS_FAILED,
} from './../actions/types';

export const initialState = {
  statsLoaded: false,
  topArtists: {
    error: '',
    list: [],
  },
  topTracks: {
    error: '',
    list: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_STATS_FINISHED:
      return { ...state, statsLoaded: true };
    case LOAD_USER_STATS_TOP_ARTISTS_SUCCEEDED:
      return {
        ...state,
        topArtists: {
          ...state.topArtists,
          list: action.payload.topArtists,
        },
      };
    case LOAD_USER_STATS_TOP_ARTISTS_FAILED:
      return { ...state, error: action.payload.error };
    case LOAD_USER_STATS_TOP_TRACKS_SUCCEEDED:
      return {
        ...state,
        topTracks: {
          ...state.topTracks,
          list: action.payload.topTracks,
        },
      };
    case LOAD_USER_STATS_TOP_TRACKS_FAILED:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
}
