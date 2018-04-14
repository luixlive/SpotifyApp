import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import errors from './util/errors';
import httpStatus from './../../utils/http_status';
import {
  CHANGE_TRACKS_TIME_RANGE,
  KEEP_SESSION_ALIVE_FAILED,
  LOAD_USER_STATS,
  LOAD_USER_STATS_FAILED,
  LOAD_USER_STATS_FINISHED,
  LOAD_USER_STATS_TOP_ARTISTS_SUCCEEDED,
  LOAD_USER_STATS_TOP_ARTISTS_FAILED,
  LOAD_USER_STATS_TOP_TRACKS_SUCCEEDED,
  LOAD_USER_STATS_TOP_TRACKS_FAILED,
} from './../actions/types';
import readResponse from './util/read_response';
import { authenticationApi, statsApi } from './../api';

export const getArtistsTimeRange = ({ userStats }) =>
  userStats.topArtists.timeRange;

export const getTracksTimeRange = ({ userStats }) =>
  userStats.topTracks.timeRange;

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
    const response = yield call(authenticationApi.keepSessionAlive.put);

    if (response.status === httpStatus.NO_CONTENT) {
      const artistsTimeRange = yield select(getArtistsTimeRange);
      const tracksTimeRange = yield select(getTracksTimeRange);
      yield all([
        call(loadTopArtists, {
          limit: 50,
          offset: 0,
          timeRange: artistsTimeRange,
        }),
        call(loadTopTracks, {
          limit: 50,
          offset: 0,
          timeRange: tracksTimeRange,
        }),
      ]);

      yield put({ type: LOAD_USER_STATS_FINISHED, payload: {} });
    } else {
      yield put({
        type: KEEP_SESSION_ALIVE_FAILED,
        payload: { error: errors.couldntKeepSessionAlive },
      });
    }
  } catch (error) {
    yield put({
      type: LOAD_USER_STATS_FAILED,
      payload: { error: errors.couldntLoadUserStats },
    });
  }
}

export function* reloadTopTracks({ payload: { timeRange } }) {
  try {
    const response = yield call(authenticationApi.keepSessionAlive.put);
    if (response.status === httpStatus.NO_CONTENT) {
      yield call(loadTopTracks, { limit: 50, offset: 0, timeRange });
    } else {
      yield put({
        type: KEEP_SESSION_ALIVE_FAILED,
        payload: { error: errors.couldntKeepSessionAlive },
      });
    }
  } catch (error) {
    yield put({
      type: LOAD_USER_STATS_TOP_TRACKS_FAILED,
      payload: { error: errors.couldntLoadTopTracks },
    });
  }
}

export default function* watcher() {
  yield takeLatest(LOAD_USER_STATS, loadUserStats);
  yield takeLatest(CHANGE_TRACKS_TIME_RANGE, reloadTopTracks);
}
