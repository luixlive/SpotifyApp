import { call, put, select, takeLatest } from 'redux-saga/effects';

import error from './../../test_utils/error';
import errors from './../../../app/sagas/util/errors';
import { loadUser } from './../../../app/sagas/user';
import { statsApi } from './../../../app/api';
import * as types from './../../../app/actions/types';
import watcher, {
  getAccessToken,
  loadUserStats,
} from './../../../app/sagas/user_stats';

describe('App Sagas - UserStats', () => {
  describe('Selectors', () => {
    it('should get access token', () => {
      const mockState = { user: { accessToken: 'token' } };
      expect(getAccessToken(mockState)).toEqual(mockState.user.accessToken);
    });
  });

  describe('Load User Stats', () => {
    it(types.LOAD_USER_STATS_SUCCEEDED, () => {
      const accessToken = 'token';

      const loadUserStatsGenerator = loadUserStats();
      expect(loadUserStatsGenerator.next().value).toEqual(call(loadUser));
      expect(loadUserStatsGenerator.next().value)
        .toEqual(select(getAccessToken));
      expect(loadUserStatsGenerator.next(accessToken).value)
        .toEqual(call(statsApi.topArtists.get));
      expect(loadUserStatsGenerator.next().value)
        .toEqual(put({ type: types.LOAD_USER_STATS_SUCCEEDED }));
      expect(loadUserStatsGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOAD_USER_STATS_FAILED} - ${errors.noAccessToken}`, () => {
      const accessToken = undefined;

      const loadUserStatsGenerator = loadUserStats();
      expect(loadUserStatsGenerator.next().value).toEqual(call(loadUser));
      expect(loadUserStatsGenerator.next().value)
        .toEqual(select(getAccessToken));
      expect(loadUserStatsGenerator.next(accessToken).value).toEqual(put({
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
        payload: error,
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
