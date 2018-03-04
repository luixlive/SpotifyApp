import emptyFunction from './empty_function';
import initialState from './initial_state';

export const appHeaderContainer = {
  isDeviceMobile: initialState.isDeviceMobile,
  isUserAuthenticated: initialState.user.isUserAuthenticated,
  logoutUser: emptyFunction,
};

export const loginContainer = { isDeviceMobile: initialState.isDeviceMobile };

export const userStatsContainer = {
  isUserAuthenticated: initialState.user.isUserAuthenticated,
  loadUserFinished: initialState.user.loadUserFinished,
  statsLoaded: initialState.userStats.statsLoaded,
  loadUserStats: emptyFunction,
};
