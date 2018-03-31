import emptyFunction from './empty_function';
import initialState from './initial_state';
import trivialReactElement from './trivial_react_element';

export const app = {
  children: trivialReactElement,
  userLoaded: initialState.user.userLoaded,
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
  statsLoaded: initialState.userStats.statsLoaded,
  loadUserStats: emptyFunction,
};
