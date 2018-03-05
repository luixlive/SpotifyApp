import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import error from './../../test_utils/error';
import * as types from './../../../app/actions/types';
import watcher, * as sagas from './../../../app/sagas/user';

describe('App Sagas - User', () => {
  describe('Load User', () => {
    it(types.LOAD_USER_SUCCEEDED, () => {
      const loadUserGenerator = sagas.loadUser();
      expect(loadUserGenerator.next().value).toEqual(call(delay, 1000));
      expect(loadUserGenerator.next().value).toEqual(put({
        type: types.LOAD_USER_SUCCEEDED,
        payload: { isUserAuthenticated: true },
      }));
      expect(loadUserGenerator.next().done).toBeTruthy();
    });

    it(types.LOAD_USER_FAILED, () => {
      const loadUserGenerator = sagas.loadUser();
      loadUserGenerator.next();
      expect(loadUserGenerator.throw(error).value).toEqual(put({
        type: types.LOAD_USER_FAILED,
        payload: error,
      }));
      expect(loadUserGenerator.next().done).toBeTruthy();
    });
  });

  describe('Logout User', () => {
    it(types.LOGOUT_USER_SUCCEEDED, () => {
      const logoutUserGenerator = sagas.logoutUser();
      expect(logoutUserGenerator.next().value).toEqual(call(delay, 1000));
      expect(logoutUserGenerator.next().value)
        .toEqual(put({ type: types.LOGOUT_USER_SUCCEEDED }));
      expect(logoutUserGenerator.next().done).toBeTruthy();
    });

    it(types.LOGOUT_USER_FAILED, () => {
      const logoutUserGenerator = sagas.logoutUser();
      logoutUserGenerator.next();
      expect(logoutUserGenerator.throw(error).value).toEqual(put({
        type: types.LOGOUT_USER_FAILED,
        payload: error,
      }));
      expect(logoutUserGenerator.next().done).toBeTruthy();
    });
  });

  describe('Watcher', () => {
    it('watches every action', () => {
      const watcherGenerator = watcher();
      expect(watcherGenerator.next().value)
        .toEqual(takeLatest(types.LOAD_USER, sagas.loadUser));
      expect(watcherGenerator.next().value)
        .toEqual(takeLatest(types.LOGOUT_USER, sagas.logoutUser));
      expect(watcherGenerator.next().done).toBeTruthy();
    });
  });
});
