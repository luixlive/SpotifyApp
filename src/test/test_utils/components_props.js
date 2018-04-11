import emptyFunction from './empty_function';
import initialState from './initial_state';
import trivialReactElement from './trivial_react_element';

export const app = {
  children: trivialReactElement,
  error: initialState.error,
  userLoaded: initialState.user.userLoaded,
  loadUser: emptyFunction,
};

export const error = {
  error: initialState.error,
  clearError: emptyFunction,
  loadUser: emptyFunction,
};

export const header = {
  deviceMobile: initialState.deviceMobile,
  userAuthenticated: initialState.user.userAuthenticated,
  logoutUser: emptyFunction,
};

export const authenticationChecker = {
  userAuthenticated: initialState.user.userAuthenticated,
  loggingOutUser: initialState.user.loggingOutUser,
};

export const message = {
  title: '',
  children: trivialReactElement,
  deviceMobile: initialState.deviceMobile,
};

export const login = { userAuthenticated: initialState.user.userAuthenticated };

export const sizeDetector = { deviceTypeChanged: emptyFunction };

export const userStats = {
  displayName: initialState.user.profile.displayName,
  statsLoaded: initialState.userStats.statsLoaded,
  loadUserStats: emptyFunction,
};
