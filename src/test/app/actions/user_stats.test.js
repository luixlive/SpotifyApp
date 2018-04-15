import * as userStatsActions from './../../../app/actions/user_stats';
import * as types from './../../../app/actions/types';

describe('App Actions - UserStats', () => {
  it(types.CHANGE_ARTISTS_TIME_RANGE, () => {
    const timeRange = 'medium_term';
    const expectedAction = {
      type: types.CHANGE_ARTISTS_TIME_RANGE,
      payload: { timeRange },
    };
    expect(userStatsActions.changeArtistsTimeRange(timeRange))
      .toEqual(expectedAction);
  });

  it(types.CHANGE_TRACKS_TIME_RANGE, () => {
    const timeRange = 'medium_term';
    const expectedAction = {
      type: types.CHANGE_TRACKS_TIME_RANGE,
      payload: { timeRange },
    };
    expect(userStatsActions.changeTracksTimeRange(timeRange))
      .toEqual(expectedAction);
  });

  it(types.LOAD_USER_STATS, () => {
    const expectedAction = {
      type: types.LOAD_USER_STATS,
      payload: {},
    };
    expect(userStatsActions.loadUserStats()).toEqual(expectedAction);
  });
});
