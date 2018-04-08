import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import errors from './util/errors';
import httpStatus from './../../utils/http_status';
import {
  KEEP_SESSION_ALIVE_FAILED,
  LOAD_USER_STATS,
  LOAD_USER_STATS_FAILED,
  LOAD_USER_STATS_FINISHED,
  LOAD_USER_STATS_TOP_ARTISTS_SUCCEEDED,
  LOAD_USER_STATS_TOP_ARTISTS_FAILED,
  LOAD_USER_STATS_TOP_TRACKS_SUCCEEDED,
  LOAD_USER_STATS_TOP_TRACKS_FAILED,
  LOGOUT_USER,
} from './../actions/types';
import readResponse from './util/read_response';
import { authenticationApi, statsApi } from './../api';

export const getUserAuthenticated = ({ user }) => user.userAuthenticated;

export function* loadTopArtists(options) {
  try {
    const response = yield call(statsApi.topArtists.get, options);

    if (response.status === httpStatus.OK) {
      const topArtists = yield call(readResponse, response);
      yield put({
        type: LOAD_USER_STATS_TOP_ARTISTS_SUCCEEDED,
        payload: { topArtists },
      });
    } else {
      yield put({
        type: LOAD_USER_STATS_TOP_ARTISTS_FAILED,
        payload: { error: errors.couldntLoadTopArtists },
      });
    }
  } catch (error) {
    yield put({
      type: LOAD_USER_STATS_TOP_ARTISTS_FAILED,
      payload: { error: errors.couldntLoadTopArtists },
    });
  }
}

export function* loadTopTracks(options) {
  try {
    const response = yield call(statsApi.topTracks.get, options);

    if (response.status === httpStatus.OK) {
      const topTracks = yield call(readResponse, response);
      yield put({
        type: LOAD_USER_STATS_TOP_TRACKS_SUCCEEDED,
        payload: { topTracks },
      });
    } else {
      yield put({
        type: LOAD_USER_STATS_TOP_TRACKS_FAILED,
        payload: { error: errors.couldntLoadTopTracks },
      });
    }
  } catch (error) {
    yield put({
      type: LOAD_USER_STATS_TOP_TRACKS_FAILED,
      payload: { error: errors.couldntLoadTopTracks },
    });
  }
}

export function* loadUserStats() {
  try {
    const userAuthenticated = yield select(getUserAuthenticated);

    if (userAuthenticated) {
      const response = yield call(authenticationApi.keepSessionAlive.put);

      if (response.status === httpStatus.NO_CONTENT) {
        // TODO: This should be configurable by the user
        yield all([
          call(loadTopArtists, {
            limit: 15,
            offset: 0,
            timeRange: 'long_term',
          }),
          call(loadTopTracks, {
            limit: 15,
            offset: 0,
            timeRange: 'long_term',
          }),
        ]);

        yield put({ type: LOAD_USER_STATS_FINISHED, payload: { } });
      } else {
        yield put({
          type: KEEP_SESSION_ALIVE_FAILED,
          payload: { error: errors.couldntKeepSessionAlive },
        });
        yield put({ type: LOGOUT_USER, payload: { } });
      }
    } else {
      yield put({
        type: LOAD_USER_STATS_FAILED,
        payload: { error: errors.noAccessToken },
      });
    }
  } catch (error) {
    yield put({
      type: LOAD_USER_STATS_FAILED,
      payload: { error: errors.couldntLoadUserStats },
    });
  }
}

export default function* watcher() {
  yield takeLatest(LOAD_USER_STATS, loadUserStats);
}
