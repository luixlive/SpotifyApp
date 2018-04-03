import _ from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';

import { authenticationApi } from './../../../app/api';
import error from './../../test_utils/error';
import errors from './../../../app/sagas/util/errors';
import httpStatus from './../../../utils/http_status';
import { mockUser } from './../../test_utils/mock_data';
import readResponse from './../../../app/sagas/util/read_response';
import * as types from './../../../app/actions/types';
import watcher, {
  loadUser,
  logoutUser,
} from './../../../app/sagas/user';

describe('App Sagas - User', () => {
  describe('Load User', () => {
    it(`${types.LOAD_USER_SUCCEEDED} - user authenticated`, () => {
      const response = { status: httpStatus.OK };
      const user = _.cloneDeep(mockUser);
      const userResponse = { ...user };

      const loadUserGenerator = loadUser();
      expect(loadUserGenerator.next().value)
        .toEqual(call(authenticationApi.user.get));
      expect(loadUserGenerator.next(response).value)
        .toEqual(call(readResponse, response));
      expect(loadUserGenerator.next(userResponse).value).toEqual(put({
        type: types.LOAD_USER_SUCCEEDED,
        payload: { ...user, userAuthenticated: true },
      }));
      expect(loadUserGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOAD_USER_SUCCEEDED} - user not authenticated`, () => {
      const response = { status: httpStatus.UNAUTHORIZED };

      const loadUserGenerator = loadUser();
      expect(loadUserGenerator.next().value)
        .toEqual(call(authenticationApi.user.get));
      expect(loadUserGenerator.next(response).value).toEqual(put({
        type: types.LOAD_USER_SUCCEEDED,
        payload: { userAuthenticated: false },
      }));
      expect(loadUserGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOAD_USER_FAILED} - ${errors.couldntLoadUser}`, () => {
      const response = { status: httpStatus.IM_A_TEAPOT };

      const loadUserGenerator = loadUser();
      expect(loadUserGenerator.next().value)
        .toEqual(call(authenticationApi.user.get));
      expect(loadUserGenerator.next(response).value).toEqual(put({
        type: types.LOAD_USER_FAILED,
        payload: { error: errors.couldntLoadUser },
      }));
      expect(loadUserGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOAD_USER_FAILED} - catch`, () => {
      const loadUserGenerator = loadUser();
      loadUserGenerator.next();
      expect(loadUserGenerator.throw(error).value).toEqual(put({
        type: types.LOAD_USER_FAILED,
        payload: { error: errors.couldntLoadUser },
      }));
      expect(loadUserGenerator.next().done).toBeTruthy();
    });
  });

  describe('Logout User', () => {
    it(types.LOGOUT_USER_SUCCEEDED, () => {
      const response = { status: httpStatus.NO_CONTENT };

      const logoutUserGenerator = logoutUser();
      expect(logoutUserGenerator.next().value)
        .toEqual(call(authenticationApi.logout.post));
      expect(logoutUserGenerator.next(response).value).toEqual(put({
        type: types.LOGOUT_USER_SUCCEEDED,
        payload: {},
      }));
      expect(logoutUserGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOGOUT_USER_FAILED} - ${errors.couldntLogout}`, () => {
      const response = { status: httpStatus.IM_A_TEAPOT };

      const logoutUserGenerator = logoutUser();
      expect(logoutUserGenerator.next().value)
        .toEqual(call(authenticationApi.logout.post));
      expect(logoutUserGenerator.next(response).value).toEqual(put({
        type: types.LOGOUT_USER_FAILED,
        payload: { error: errors.couldntLogout },
      }));
      expect(logoutUserGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOGOUT_USER_FAILED} - catch`, () => {
      const logoutUserGenerator = logoutUser();
      logoutUserGenerator.next();
      expect(logoutUserGenerator.throw(error).value).toEqual(put({
        type: types.LOGOUT_USER_FAILED,
        payload: { error: errors.couldntLogout },
      }));
      expect(logoutUserGenerator.next().done).toBeTruthy();
    });
  });

  describe('Watcher', () => {
    it('watches every action', () => {
      const watcherGenerator = watcher();
      expect(watcherGenerator.next().value)
        .toEqual(takeLatest(types.LOAD_USER, loadUser));
      expect(watcherGenerator.next().value)
        .toEqual(takeLatest(types.LOGOUT_USER, logoutUser));
      expect(watcherGenerator.next().done).toBeTruthy();
    });
  });
});
