import { combineReducers } from 'redux';

import deviceMobile from './device';
import user from './user';
import userStats from './user_stats';

export default combineReducers({
  deviceMobile,
  user,
  userStats,
});
