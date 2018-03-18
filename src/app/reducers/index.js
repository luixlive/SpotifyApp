import { combineReducers } from 'redux';

import isDeviceMobile from './device';
import user from './user';
import userStats from './user_stats';

export default combineReducers({
  isDeviceMobile,
  user,
  userStats,
});
