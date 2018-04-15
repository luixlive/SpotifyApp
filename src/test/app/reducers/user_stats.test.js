import error from './../../test_utils/error';
import { mockTopArtists, mockTopTracks } from './../../test_utils/mock_data';
import userStatsReducer, {
  initialState,
} from './../../../app/reducers/user_stats';
import * as types from './../../../app/actions/types';

describe('App Reducers - UserStats', () => {
  it('should return initial state', () => {
    expect(userStatsReducer(undefined, {})).toEqual(initialState);
  });

  it(types.CHANGE_ARTISTS_TIME_RANGE, () => {
    const timeRange = 'medium_term';
    const action = {
      type: types.CHANGE_ARTISTS_TIME_RANGE,
      payload: { timeRange },
    };
    const expectedState = {
      ...initialState,
      topArtists: {
        ...initialState.topArtists,
        timeRange,
        reloading: true,
      },
    };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.CHANGE_TRACKS_TIME_RANGE, () => {
    const timeRange = 'medium_term';
    const action = {
      type: types.CHANGE_TRACKS_TIME_RANGE,
      payload: { timeRange },
    };
    const expectedState = {
      ...initialState,
      topTracks: {
        ...initialState.topTracks,
        timeRange,
        reloading: true,
      },
    };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOAD_USER_STATS_FINISHED, () => {
    const action = { type: types.LOAD_USER_STATS_FINISHED, payload: {} };
    const expectedState = { ...initialState, statsLoaded: true };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOAD_USER_STATS_TOP_ARTISTS_SUCCEEDED, () => {
    const action = {
      type: types.LOAD_USER_STATS_TOP_ARTISTS_SUCCEEDED,
      payload: { topArtists: mockTopArtists },
    };
    const expectedState = {
      ...initialState,
      topArtists: {
        ...initialState.topArtists,
        list: mockTopArtists,
      },
    };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOAD_USER_STATS_TOP_ARTISTS_FAILED, () => {
    const action = {
      type: types.LOAD_USER_STATS_TOP_ARTISTS_FAILED,
      payload: { error },
    };
    const expectedState = {
      ...initialState,
      topArtists: { ...initialState.topArtists, error },
    };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOAD_USER_STATS_TOP_TRACKS_SUCCEEDED, () => {
    const action = {
      type: types.LOAD_USER_STATS_TOP_TRACKS_SUCCEEDED,
      payload: { topTracks: mockTopTracks },
    };
    const expectedState = {
      ...initialState,
      topTracks: {
        ...initialState.topTracks,
        list: mockTopTracks,
      },
    };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOAD_USER_STATS_TOP_TRACKS_FAILED, () => {
    const action = {
      type: types.LOAD_USER_STATS_TOP_TRACKS_FAILED,
      payload: { error },
    };
    const expectedState = {
      ...initialState,
      topTracks: { ...initialState.topTracks, error },
    };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });
});
