import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { loadUser } from './user';

import {
  LOAD_USER_STATS,
  LOAD_USER_STATS_FAILED,
  LOAD_USER_STATS_SUCCEEDED,
} from './../actions/types';

export function* loadUserStats() {
  try {
    yield call(loadUser);
    yield call(delay, 1000); // TODO: Retrieve user stats
    yield put({ type: LOAD_USER_STATS_SUCCEEDED });
  } catch (error) {
    yield put({ type: LOAD_USER_STATS_FAILED, payload: error });
  }
}

export default function* watcher() {
  yield takeLatest(LOAD_USER_STATS, loadUserStats);
}
