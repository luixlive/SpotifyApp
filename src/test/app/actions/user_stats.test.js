import loadUserStats from './../../../app/actions/user_stats';
import * as types from './../../../app/actions/types';

describe('App Actions - UserStats', () => {
  it(types.LOAD_USER_STATS, () => {
    const expectedAction = {
      type: types.LOAD_USER_STATS,
      payload: {},
    };
    expect(loadUserStats()).toEqual(expectedAction);
  });
});
