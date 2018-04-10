import { call, put, takeLatest } from 'redux-saga/effects';

import { authenticationApi } from './../api';
import errors from './util/errors';
import httpStatus from './../../utils/http_status';
import {
  CLEAR_ERROR,
  LOAD_USER,
  LOAD_USER_FAILED,
  LOAD_USER_SUCCEEDED,
  LOGOUT_USER,
  LOGOUT_USER_FAILED,
  LOGOUT_USER_SUCCEEDED,
} from './../actions/types';
import readResponse from './util/read_response';

export function* loadUser() {
  try {
    const response = yield call(authenticationApi.user.get);

    if (response.status === httpStatus.OK) {
      const profile = yield call(readResponse, response);
      yield put({
        type: LOAD_USER_SUCCEEDED,
        payload: { profile, userAuthenticated: true },
      });
    } else if (response.status === httpStatus.UNAUTHORIZED) {
      yield put({
        type: LOAD_USER_SUCCEEDED,
        payload: { userAuthenticated: false },
      });
    } else {
      yield put({
        type: LOAD_USER_FAILED,
        payload: { error: errors.couldntLoadUser },
      });
    }
  } catch (error) {
    yield put({
      type: LOAD_USER_FAILED,
      payload: { error: errors.couldntLoadUser },
    });
  }
}

export function* logoutUser() {
  try {
    const response = yield call(authenticationApi.logout.post);

    if (response.status === httpStatus.NO_CONTENT) {
      yield put({ type: CLEAR_ERROR, payload: {} });
      yield put({ type: LOGOUT_USER_SUCCEEDED, payload: {} });
    } else {
      yield put({
        type: LOGOUT_USER_FAILED,
        payload: { error: errors.couldntLogout },
      });
    }
  } catch (error) {
    yield put({
      type: LOGOUT_USER_FAILED,
      payload: { error: errors.couldntLogout },
    });
  }
}

export default function* watcher() {
  yield takeLatest(LOAD_USER, loadUser);
  yield takeLatest(LOGOUT_USER, logoutUser);
}
