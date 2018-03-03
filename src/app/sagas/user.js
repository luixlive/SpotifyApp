import { delay } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';

import {
  LOAD_USER,
  LOAD_USER_FAILED,
  LOAD_USER_SUCCEEDED,
  LOGOUT_USER,
  LOGOUT_USER_FAILED,
  LOGOUT_USER_SUCCEEDED,
} from './../actions/types';

export function* loadUser() {
  try {
    yield delay(1000); // TODO: Retrieve user
    yield put({
      type: LOAD_USER_SUCCEEDED,
      payload: { isUserAuthenticated: true },
    });
  } catch (error) {
    yield put({ type: LOAD_USER_FAILED, payload: error });
  }
}

export function* logoutUser() {
  try {
    yield delay(1000); // TODO: Call logout user
    yield put({ type: LOGOUT_USER_SUCCEEDED });
  } catch (error) {
    yield put({ type: LOGOUT_USER_FAILED, payload: error });
  }
}

export default function* watcher() {
  yield takeLatest(LOAD_USER, loadUser);
  yield takeLatest(LOGOUT_USER, logoutUser);
}
