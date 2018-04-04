import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import error from './../../test_utils/error';
import errors from './../../../app/sagas/util/errors';
import * as types from './../../../app/actions/types';
import watcher, {
  getUserAuthenticated,
  loadTopArtists,
  loadTopTracks,
  loadUserStats,
} from './../../../app/sagas/user_stats';

describe('App Sagas - UserStats', () => {
  describe('Selectors', () => {
    it('should get userAuthenticated', () => {
      const mockState = { user: { accessToken: 'token' } };
      expect(getUserAuthenticated(mockState))
        .toEqual(mockState.user.getUserAuthenticated);
    });
  });

  describe('Load User Stats', () => {
    it(types.LOAD_USER_STATS_FINISHED, () => {
      const options = { limit: 15, offset: 0, timeRange: 'long_term' };
      const userAuthenticated = true;

      const loadUserStatsGenerator = loadUserStats();
      expect(loadUserStatsGenerator.next().value)
        .toEqual(select(getUserAuthenticated));
      expect(loadUserStatsGenerator.next(userAuthenticated).value)
        .toEqual(all([
          call(loadTopArtists, options),
          call(loadTopTracks, options),
        ]));
      expect(loadUserStatsGenerator.next().value)
        .toEqual(put({ type: types.LOAD_USER_STATS_FINISHED, payload: { } }));
      expect(loadUserStatsGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOAD_USER_STATS_FAILED} - ${errors.noAccessToken}`, () => {
      const userAuthenticated = false;

      const loadUserStatsGenerator = loadUserStats();
      expect(loadUserStatsGenerator.next().value)
        .toEqual(select(getUserAuthenticated));
      expect(loadUserStatsGenerator.next(userAuthenticated).value)
        .toEqual(put({
          type: types.LOAD_USER_STATS_FAILED,
          payload: { error: errors.noAccessToken },
        }));
      expect(loadUserStatsGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOAD_USER_STATS_FAILED} - catch`, () => {
      const loadUserStatsGenerator = loadUserStats();
      loadUserStatsGenerator.next();
      expect(loadUserStatsGenerator.throw(error).value).toEqual(put({
        type: types.LOAD_USER_STATS_FAILED,
        payload: { error: errors.couldntLoadUserStats },
      }));
      expect(loadUserStatsGenerator.next().done).toBeTruthy();
    });
  });

  describe('Watcher', () => {
    it('watches every action', () => {
      const watcherGenerator = watcher();
      expect(watcherGenerator.next().value)
        .toEqual(takeLatest(types.LOAD_USER_STATS, loadUserStats));
      expect(watcherGenerator.next().done).toBeTruthy();
    });
  });
});
