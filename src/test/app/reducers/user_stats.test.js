import error from './../../test_utils/error';
import userStatsReducer, {
  initialState,
} from './../../../app/reducers/user_stats';
import * as types from './../../../app/actions/types';

describe('App Reducers - UserStats', () => {
  it('should return initial state', () => {
    expect(userStatsReducer(undefined, {})).toEqual(initialState);
  });

  it(types.LOAD_USER_STATS_FINISHED, () => {
    const action = { type: types.LOAD_USER_STATS_FINISHED, payload: {} };
    const expectedState = { ...initialState, statsLoaded: true };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOAD_USER_STATS_TOP_ARTISTS_SUCCEEDED, () => {
    const action = {
      type: types.LOAD_USER_STATS_TOP_ARTISTS_SUCCEEDED,
      payload: { topArtists: ['artist1', 'artist2'] },
    };
    const expectedState = {
      ...initialState,
      topArtists: {
        ...initialState.topArtists,
        list: ['artist1', 'artist2'],
      },
    };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOAD_USER_STATS_TOP_ARTISTS_FAILED, () => {
    const action = {
      type: types.LOAD_USER_STATS_TOP_ARTISTS_FAILED,
      payload: { error },
    };
    const expectedState = { ...initialState, error };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOAD_USER_STATS_TOP_TRACKS_SUCCEEDED, () => {
    const action = {
      type: types.LOAD_USER_STATS_TOP_TRACKS_SUCCEEDED,
      payload: { topTracks: ['track1', 'track2'] },
    };
    const expectedState = {
      ...initialState,
      topTracks: {
        ...initialState.topArtists,
        list: ['track1', 'track2'],
      },
    };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOAD_USER_STATS_TOP_TRACKS_FAILED, () => {
    const action = {
      type: types.LOAD_USER_STATS_TOP_TRACKS_FAILED,
      payload: { error },
    };
    const expectedState = { ...initialState, error };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });
});
