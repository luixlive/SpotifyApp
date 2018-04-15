import _ from 'lodash';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import error from './../../test_utils/error';
import errors from './../../../app/sagas/util/errors';
import httpStatus from './../../../utils/http_status';
import { mockTopArtists, mockTopTracks } from './../../test_utils/mock_data';
import readResponse from './../../../app/sagas/util/read_response';
import { authenticationApi, statsApi } from './../../../app/api';
import * as types from './../../../app/actions/types';
import watcher, {
  getArtistsTimeRange,
  getTracksTimeRange,
  loadTopArtists,
  loadTopTracks,
  loadUserStats,
  reloadTopArtists,
  reloadTopTracks,
} from './../../../app/sagas/user_stats';

describe('App Sagas - UserStats', () => {
  describe('Selectors', () => {
    it('should get artists time range', () => {
      const timeRange = 'short_term';
      const mockState = { userStats: { topArtists: { timeRange } } };
      expect(getArtistsTimeRange(mockState))
        .toEqual(timeRange);
    });

    it('should get tracks time range', () => {
      const timeRange = 'long_term';
      const mockState = { userStats: { topTracks: { timeRange } } };
      expect(getTracksTimeRange(mockState))
        .toEqual(timeRange);
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
      const keepSessionAliveResponse = { status: httpStatus.NO_CONTENT };
      const artistsTimeRange = 'short_term';
      const tracksTimeRange = 'long_term';

      const loadUserStatsGenerator = loadUserStats();
      expect(loadUserStatsGenerator.next().value)
        .toEqual(call(authenticationApi.keepSessionAlive.put));
      expect(loadUserStatsGenerator.next(keepSessionAliveResponse).value)
        .toEqual(select(getArtistsTimeRange));
      expect(loadUserStatsGenerator.next(artistsTimeRange).value)
        .toEqual(select(getTracksTimeRange));
      expect(loadUserStatsGenerator.next(tracksTimeRange).value)
        .toEqual(all([
          call(
            loadTopArtists,
            { limit: 50, offset: 0, timeRange: artistsTimeRange },
          ),
          call(
            loadTopTracks,
            { limit: 50, offset: 0, timeRange: tracksTimeRange },
          ),
        ]));
      expect(loadUserStatsGenerator.next().value)
        .toEqual(put({ type: types.LOAD_USER_STATS_FINISHED, payload: {} }));
      expect(loadUserStatsGenerator.next().done).toBeTruthy();
    });

    it(types.KEEP_SESSION_ALIVE_FAILED, () => {
      const keepSessionAliveResponse = { status: httpStatus.IM_A_TEAPOT };

      const loadUserStatsGenerator = loadUserStats();
      expect(loadUserStatsGenerator.next().value)
        .toEqual(call(authenticationApi.keepSessionAlive.put));
      expect(loadUserStatsGenerator.next(keepSessionAliveResponse).value)
        .toEqual(put({
          type: types.KEEP_SESSION_ALIVE_FAILED,
          payload: { error: errors.couldntKeepSessionAlive },
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

  describe('Reload Top Artists', () => {
    it('CALL loadTopArtists', () => {
      const keepSessionAliveResponse = { status: httpStatus.NO_CONTENT };
      const timeRange = 'medium_term';

      const reloadTopArtistsGenerator = reloadTopArtists({
        payload: { timeRange },
      });
      expect(reloadTopArtistsGenerator.next().value)
        .toEqual(call(authenticationApi.keepSessionAlive.put));
      expect(reloadTopArtistsGenerator.next(keepSessionAliveResponse).value)
        .toEqual(call(loadTopArtists, { limit: 50, offset: 0, timeRange }));
      expect(reloadTopArtistsGenerator.next().done).toBeTruthy();
    });

    it(types.KEEP_SESSION_ALIVE_FAILED, () => {
      const keepSessionAliveResponse = { status: httpStatus.IM_A_TEAPOT };
      const timeRange = 'medium_term';

      const reloadTopArtistsGenerator = reloadTopArtists({
        payload: { timeRange },
      });
      expect(reloadTopArtistsGenerator.next().value)
        .toEqual(call(authenticationApi.keepSessionAlive.put));
      expect(reloadTopArtistsGenerator.next(keepSessionAliveResponse).value)
        .toEqual(put({
          type: types.KEEP_SESSION_ALIVE_FAILED,
          payload: { error: errors.couldntKeepSessionAlive },
        }));
      expect(reloadTopArtistsGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOAD_USER_STATS_TOP_ARTISTS_FAILED} - catch`, () => {
      const reloadTopArtistsGenerator = reloadTopArtists({
        payload: { timeRange: '' },
      });
      reloadTopArtistsGenerator.next();
      expect(reloadTopArtistsGenerator.throw(error).value).toEqual(put({
        type: types.LOAD_USER_STATS_TOP_ARTISTS_FAILED,
        payload: { error: errors.couldntLoadTopArtists },
      }));
      expect(reloadTopArtistsGenerator.next().done).toBeTruthy();
    });
  });

  describe('Reload Top Tracks', () => {
    it('CALL loadTopTracks', () => {
      const keepSessionAliveResponse = { status: httpStatus.NO_CONTENT };
      const timeRange = 'medium_term';

      const reloadTopTracksGenerator = reloadTopTracks({
        payload: { timeRange },
      });
      expect(reloadTopTracksGenerator.next().value)
        .toEqual(call(authenticationApi.keepSessionAlive.put));
      expect(reloadTopTracksGenerator.next(keepSessionAliveResponse).value)
        .toEqual(call(loadTopTracks, { limit: 50, offset: 0, timeRange }));
      expect(reloadTopTracksGenerator.next().done).toBeTruthy();
    });

    it(types.KEEP_SESSION_ALIVE_FAILED, () => {
      const keepSessionAliveResponse = { status: httpStatus.IM_A_TEAPOT };
      const timeRange = 'medium_term';

      const reloadTopTracksGenerator = reloadTopTracks({
        payload: { timeRange },
      });
      expect(reloadTopTracksGenerator.next().value)
        .toEqual(call(authenticationApi.keepSessionAlive.put));
      expect(reloadTopTracksGenerator.next(keepSessionAliveResponse).value)
        .toEqual(put({
          type: types.KEEP_SESSION_ALIVE_FAILED,
          payload: { error: errors.couldntKeepSessionAlive },
        }));
      expect(reloadTopTracksGenerator.next().done).toBeTruthy();
    });

    it(`${types.LOAD_USER_STATS_TOP_TRACKS_FAILED} - catch`, () => {
      const reloadTopTracksGenerator = reloadTopTracks({
        payload: { timeRange: '' },
      });
      reloadTopTracksGenerator.next();
      expect(reloadTopTracksGenerator.throw(error).value).toEqual(put({
        type: types.LOAD_USER_STATS_TOP_TRACKS_FAILED,
        payload: { error: errors.couldntLoadTopTracks },
      }));
      expect(reloadTopTracksGenerator.next().done).toBeTruthy();
    });
  });

  describe('Watcher', () => {
    it('watches every action', () => {
      const watcherGenerator = watcher();
      expect(watcherGenerator.next().value)
        .toEqual(takeLatest(types.CHANGE_ARTISTS_TIME_RANGE, reloadTopArtists));
      expect(watcherGenerator.next().value)
        .toEqual(takeLatest(types.CHANGE_TRACKS_TIME_RANGE, reloadTopTracks));
      expect(watcherGenerator.next().value)
        .toEqual(takeLatest(types.LOAD_USER_STATS, loadUserStats));
      expect(watcherGenerator.next().done).toBeTruthy();
    });
  });
});
