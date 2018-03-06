import { call, put, takeLatest } from 'redux-saga/effects';

import authenticationApi from './../api';
import errors from './util/errors';
import httpStatus from './../../utils/http_status';
import {
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
      const user = yield call(readResponse(response));
      yield put({
        type: LOAD_USER_SUCCEEDED,
        payload: { ...user, isUserAuthenticated: true },
      });
    } else if (response.status === httpStatus.UNAUTHORIZED) {
      yield put({
        type: LOAD_USER_SUCCEEDED,
        payload: { isUserAuthenticated: false },
      });
    } else {
      yield put({
        type: LOAD_USER_FAILED,
        payload: { error: errors.unexpected },
      });
    }
  } catch (error) {
    yield put({ type: LOAD_USER_FAILED, payload: error });
  }
}

export function* logoutUser() {
  try {
    const response = yield call(authenticationApi.logout.get);

    if (response.status === httpStatus.OK) {
      yield put({ type: LOGOUT_USER_SUCCEEDED });
    } else {
      yield put({
        type: LOGOUT_USER_FAILED,
        payload: { error: errors.unexpected },
      });
    }
  } catch (error) {
    yield put({ type: LOGOUT_USER_FAILED, payload: error });
  }
}

export default function* watcher() {
  yield takeLatest(LOAD_USER, loadUser);
  yield takeLatest(LOGOUT_USER, logoutUser);
}
