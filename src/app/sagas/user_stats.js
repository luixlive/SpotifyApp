import { call, put, select, takeLatest } from 'redux-saga/effects';

import errors from './util/errors';
import {
  LOAD_USER_STATS,
  LOAD_USER_STATS_FAILED,
  LOAD_USER_STATS_SUCCEEDED,
} from './../actions/types';
import { statsApi } from './../api';

export const getUserAuthenticated = ({ user }) => user.userAuthenticated;

export function* loadUserStats() {
  try {
    const userAuthenticated = yield select(getUserAuthenticated);

    if (userAuthenticated) {
      yield call(statsApi.topArtists.get);
      yield put({ type: LOAD_USER_STATS_SUCCEEDED });
    } else {
      yield put({
        type: LOAD_USER_STATS_FAILED,
        payload: { error: errors.noAccessToken },
      });
    }
  } catch (error) {
    yield put({ type: LOAD_USER_STATS_FAILED, payload: error });
  }
}

export default function* watcher() {
  yield takeLatest(LOAD_USER_STATS, loadUserStats);
}
