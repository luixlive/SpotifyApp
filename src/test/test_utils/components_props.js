import emptyFunction from './empty_function';
import initialState from './initial_state';

export const appHeaderContainer = {
  isDeviceMobile: initialState.isDeviceMobile,
  isUserAuthenticated: initialState.user.isUserAuthenticated,
  logoutUser: emptyFunction,
};

export const loginContainer = { isDeviceMobile: initialState.isDeviceMobile };

export const userStatsContainer = {
  statsLoaded: initialState.userStats.statsLoaded,
  loadUserStats: emptyFunction,
};
