import { combineReducers } from 'redux';

import deviceMobile from './device';
import error from './error';
import user from './user';
import userStats from './user_stats';

export const reducers = { deviceMobile, error, user, userStats };

export default combineReducers(reducers);
