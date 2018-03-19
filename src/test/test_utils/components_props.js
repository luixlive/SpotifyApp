import emptyFunction from './empty_function';
import initialState from './initial_state';

export const appHeaderContainer = {
  isDeviceMobile: initialState.isDeviceMobile,
  isUserAuthenticated: initialState.user.isUserAuthenticated,
  logoutUser: emptyFunction,
};

export const authenticationChecker = {
  isUserAuthenticated: initialState.user.isUserAuthenticated,
  loadUserFinished: initialState.user.loadUserFinished,
  loggingOutUser: initialState.user.loggingOutUser,
  loadUser: emptyFunction,
};

export const loginContainer = { isDeviceMobile: initialState.isDeviceMobile };

export const sizeDetector = { deviceTypeChanged: emptyFunction };

export const userStatsContainer = {
  statsLoaded: initialState.userStats.statsLoaded,
  loadUserStats: emptyFunction,
};
