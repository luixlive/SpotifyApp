import FORM_OPTIONS from './../util/constants';
import {
  CHANGE_TRACKS_TIME_RANGE,
  LOAD_USER_STATS_FINISHED,
  LOAD_USER_STATS_TOP_ARTISTS_SUCCEEDED,
  LOAD_USER_STATS_TOP_ARTISTS_FAILED,
  LOAD_USER_STATS_TOP_TRACKS_SUCCEEDED,
  LOAD_USER_STATS_TOP_TRACKS_FAILED,
} from './../actions/types';

const { SHORT_TERM } = FORM_OPTIONS.TIME_RANGE;

export const initialState = {
  statsLoaded: false,
  topArtists: {
    error: '',
    list: [],
    reloading: false,
    timeRange: SHORT_TERM,
  },
  topTracks: {
    error: '',
    list: [],
    reloading: false,
    timeRange: SHORT_TERM,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_TRACKS_TIME_RANGE:
      return {
        ...state,
        topTracks: {
          ...state.topTracks,
          timeRange: action.payload.timeRange,
          reloading: true,
        },
      };
    case LOAD_USER_STATS_FINISHED:
      return { ...state, statsLoaded: true };
    case LOAD_USER_STATS_TOP_ARTISTS_SUCCEEDED:
      return {
        ...state,
        topArtists: {
          ...state.topArtists,
          list: action.payload.topArtists,
          reloading: false,
        },
      };
    case LOAD_USER_STATS_TOP_ARTISTS_FAILED:
      return {
        ...state,
        topArtists: {
          ...state.topTracks,
          error: action.payload.error,
          reloading: false,
        },
      };
    case LOAD_USER_STATS_TOP_TRACKS_SUCCEEDED:
      return {
        ...state,
        topTracks: {
          ...state.topTracks,
          list: action.payload.topTracks,
          reloading: false,
        },
      };
    case LOAD_USER_STATS_TOP_TRACKS_FAILED:
      return {
        ...state,
        topTracks: {
          ...state.topTracks,
          error: action.payload.error,
          reloading: false,
        },
      };
    default:
      return state;
  }
}
