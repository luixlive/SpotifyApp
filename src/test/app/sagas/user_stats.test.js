import _ from 'lodash';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import error from './../../test_utils/error';
import errors from './../../../app/sagas/util/errors';
import httpStatus from './../../../utils/http_status';
import { mockTopArtists, mockTopTracks } from './../../test_utils/mock_data';
import readResponse from './../../../app/sagas/util/read_response';
import { statsApi } from './../../../app/api';
import * as types from './../../../app/actions/types';
import watcher, {
  getUserAuthenticated,
  loadTopArtists,
  loadTopTracks,
  loadUserStats,
} from './../../../app/sagas/user_stats';

describe('App Sagas - UserStats', () => {
  describe('Selectors', () => {
    it('should get userAuthenticated', () => {
      const mockState = { user: { accessToken: 'token' } };
      expect(getUserAuthenticated(mockState))
        .toEqual(mockState.user.getUserAuthenticated);
    });
  });

  describe('Load Top Artists', () => {
    let options;
    beforeEach(() => {
      options = { limit: 15, offset: 0, timeRange: 'long_term' };
    });

    it(types.LOAD_USER_STATS_TOP_ARTISTS_SUCCEEDED, () => {
      const response = { status: httpStatus.OK };
      const topArtists = _.cloneDeep(mockTopArtists);

      const loadTopArtistsGenerator = loadTopArtists(options);
      expect(loadTopArtistsGenerator.next().value)
        .toEqual(call(statsApi.topArtists.get, options));
      expect(loadTopArtistsGenerator.next(response).value)
        .toEqual(call(readResponse, response));
      expect(loadTopArtistsGenerator.next(topArtists).value)
        .toEqual(put({
          type: types.LOAD_USER_STATS_TOP_ARTISTS_SUCCEEDED,
          payload: { topArtists },
        }));
      expect(loadTopArtistsGenerator.next().done).toBeTruthy();
    });

    /* eslint-disable-next-line max-len */
    it(`${types.LOAD_USER_STATS_TOP_ARTISTS_FAILED} - ${errors.couldntLoadTopArtists}`, () => {
      const response = { status: httpStatus.IM_A_TEAPOT };

      const loadTopArtistsGenerator = loadTopArtists(options);
      expect(loadTopArtistsGenerator.next().value)
        .toEqual(call(statsApi.topArtists.get, options));
      expect(loadTopArtistsGenerator.next(response).value)
        .toEqual(put({
          type: types.LOAD_USER_STATS_TOP_ARTISTS_FAILED,
          payload: { error: errors.couldntLoadTopArtists },
        }));
      expect(loadTopArtistsGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOAD_USER_STATS_TOP_ARTISTS_FAILED} - catch`, () => {
      const loadTopArtistsGenerator = loadTopArtists(options);
      loadTopArtistsGenerator.next();
      expect(loadTopArtistsGenerator.throw(error).value).toEqual(put({
        type: types.LOAD_USER_STATS_TOP_ARTISTS_FAILED,
        payload: { error: errors.couldntLoadTopArtists },
      }));
      expect(loadTopArtistsGenerator.next().done).toBeTruthy();
    });
  });

  describe('Load Top Tracks', () => {
    let options;
    beforeEach(() => {
      options = { limit: 15, offset: 0, timeRange: 'long_term' };
    });

    it(types.LOAD_USER_STATS_TOP_TRACKS_SUCCEEDED, () => {
      const response = { status: httpStatus.OK };
      const topTracks = _.cloneDeep(mockTopTracks);

      const loadTopTracksGenerator = loadTopTracks(options);
      expect(loadTopTracksGenerator.next().value)
        .toEqual(call(statsApi.topTracks.get, options));
      expect(loadTopTracksGenerator.next(response).value)
        .toEqual(call(readResponse, response));
      expect(loadTopTracksGenerator.next(topTracks).value)
        .toEqual(put({
          type: types.LOAD_USER_STATS_TOP_TRACKS_SUCCEEDED,
          payload: { topTracks },
        }));
      expect(loadTopTracksGenerator.next().done).toBeTruthy();
    });

    /* eslint-disable-next-line max-len */
    it(`${types.LOAD_USER_STATS_TOP_TRACKS_FAILED} - ${errors.couldntLoadTopTracks}`, () => {
      const response = { status: httpStatus.IM_A_TEAPOT };

      const loadTopTracksGenerator = loadTopTracks(options);
      expect(loadTopTracksGenerator.next().value)
        .toEqual(call(statsApi.topTracks.get, options));
      expect(loadTopTracksGenerator.next(response).value)
        .toEqual(put({
          type: types.LOAD_USER_STATS_TOP_TRACKS_FAILED,
          payload: { error: errors.couldntLoadTopTracks },
        }));
      expect(loadTopTracksGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOAD_USER_STATS_TOP_TRACKS_FAILED} - catch`, () => {
      const loadTopTracksGenerator = loadTopTracks(options);
      loadTopTracksGenerator.next();
      expect(loadTopTracksGenerator.throw(error).value).toEqual(put({
        type: types.LOAD_USER_STATS_TOP_TRACKS_FAILED,
        payload: { error: errors.couldntLoadTopTracks },
      }));
      expect(loadTopTracksGenerator.next().done).toBeTruthy();
    });
  });

  describe('Load User Stats', () => {
    it(types.LOAD_USER_STATS_FINISHED, () => {
      const options = { limit: 15, offset: 0, timeRange: 'long_term' };
      const userAuthenticated = true;

      const loadUserStatsGenerator = loadUserStats();
      expect(loadUserStatsGenerator.next().value)
        .toEqual(select(getUserAuthenticated));
      expect(loadUserStatsGenerator.next(userAuthenticated).value)
        .toEqual(all([
          call(loadTopArtists, options),
          call(loadTopTracks, options),
        ]));
      expect(loadUserStatsGenerator.next().value)
        .toEqual(put({ type: types.LOAD_USER_STATS_FINISHED, payload: { } }));
      expect(loadUserStatsGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOAD_USER_STATS_FAILED} - ${errors.noAccessToken}`, () => {
      const userAuthenticated = false;

      const loadUserStatsGenerator = loadUserStats();
      expect(loadUserStatsGenerator.next().value)
        .toEqual(select(getUserAuthenticated));
      expect(loadUserStatsGenerator.next(userAuthenticated).value)
        .toEqual(put({
          type: types.LOAD_USER_STATS_FAILED,
          payload: { error: errors.noAccessToken },
        }));
      expect(loadUserStatsGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOAD_USER_STATS_FAILED} - catch`, () => {
      const loadUserStatsGenerator = loadUserStats();
      loadUserStatsGenerator.next();
      expect(loadUserStatsGenerator.throw(error).value).toEqual(put({
        type: types.LOAD_USER_STATS_FAILED,
        payload: { error: errors.couldntLoadUserStats },
      }));
      expect(loadUserStatsGenerator.next().done).toBeTruthy();
    });
  });

  describe('Watcher', () => {
    it('watches every action', () => {
      const watcherGenerator = watcher();
      expect(watcherGenerator.next().value)
        .toEqual(takeLatest(types.LOAD_USER_STATS, loadUserStats));
      expect(watcherGenerator.next().done).toBeTruthy();
    });
  });
});
