import emptyFunction from './empty_function';
import initialState from './initial_state';
import trivialReactElement from './trivial_react_element';

export const appContainer = {
  children: trivialReactElement,
  userLoaded: initialState.user.userLoaded,
  loadUser: emptyFunction,
};

export const appHeaderContainer = {
  deviceMobile: initialState.deviceMobile,
  userAuthenticated: initialState.user.userAuthenticated,
  logoutUser: emptyFunction,
};

export const authenticationChecker = {
  userAuthenticated: initialState.user.userAuthenticated,
  loggingOutUser: initialState.user.loggingOutUser,
};

export const loginContainer = {
  deviceMobile: initialState.deviceMobile,
  userAuthenticated: initialState.user.userAuthenticated,
};

export const notFoundContainer = {
  deviceMobile: initialState.deviceMobile,
};

export const sizeDetector = { deviceTypeChanged: emptyFunction };

export const userStatsContainer = {
  statsLoaded: initialState.userStats.statsLoaded,
  loadUserStats: emptyFunction,
};
