import { CHANGE_TRACKS_TIME_RANGE, LOAD_USER_STATS } from './types';

export const changeTracksTimeRange = timeRange => (
  { type: CHANGE_TRACKS_TIME_RANGE, payload: { timeRange } }
);

export const loadUserStats = () => (
  { type: LOAD_USER_STATS, payload: {} }
);
