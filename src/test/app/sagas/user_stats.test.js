import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import error from './../../test_utils/error';
import { loadUser } from './../../../app/sagas/user';
import * as types from './../../../app/actions/types';
import watcher, * as sagas from './../../../app/sagas/user_stats';

describe('App Sagas - UserStats', () => {
  describe('Load User Stats', () => {
    it(types.LOAD_USER_STATS_SUCCEEDED, () => {
      const loadUserStatsGenerator = sagas.loadUserStats();
      expect(loadUserStatsGenerator.next().value).toEqual(call(loadUser));
      expect(loadUserStatsGenerator.next().value).toEqual(call(delay, 1000));
      expect(loadUserStatsGenerator.next().value)
        .toEqual(put({ type: types.LOAD_USER_STATS_SUCCEEDED }));
      expect(loadUserStatsGenerator.next().done).toBeTruthy();
    });

    it(types.LOAD_USER_STATS_FAILED, () => {
      const loadUserStatsGenerator = sagas.loadUserStats();
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
        .toEqual(takeLatest(types.LOAD_USER_STATS, sagas.loadUserStats));
      expect(watcherGenerator.next().done).toBeTruthy();
    });
  });
});
