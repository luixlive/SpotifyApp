import emptyFunction from './empty_function';
import initialState from './initial_state';
import trivialReactElement from './trivial_react_element';

export const app = {
  children: trivialReactElement,
  error: initialState.error,
  userLoaded: initialState.user.userLoaded,
  loadUser: emptyFunction,
};

export const artists = {};

export const artistList = {
  reloading: initialState.userStats.topArtists.reloading,
  artists: initialState.userStats.topArtists.list,
};

export const authenticationChecker = {
  userAuthenticated: initialState.user.userAuthenticated,
  loggingOutUser: initialState.user.loggingOutUser,
};

export const error = {
  error: initialState.error,
  clearError: emptyFunction,
  loadUser: emptyFunction,
};

export const form = {
  type: 'tracks',
  tracksTimeRange: initialState.userStats.topTracks.timeRange,
  artistsTimeRange: initialState.userStats.topArtists.timeRange,
  changeArtistsTimeRange: emptyFunction,
  changeTracksTimeRange: emptyFunction,
};

export const header = {
  deviceMobile: initialState.deviceMobile,
  userAuthenticated: initialState.user.userAuthenticated,
  logoutUser: emptyFunction,
};

export const login = { userAuthenticated: initialState.user.userAuthenticated };

export const message = {
  title: '',
  children: trivialReactElement,
  deviceMobile: initialState.deviceMobile,
};

export const screenLoader = { text: '' };

export const sizeDetector = { deviceTypeChanged: emptyFunction };

export const tracks = {};

export const trackList = {
  reloading: initialState.userStats.topTracks.reloading,
  tracks: initialState.userStats.topTracks.list,
};

export const tracksArtistsTemplate = {
  type: 'tracks',
  deviceMobile: initialState.deviceMobile,
};

export const userStats = {
  displayName: initialState.user.profile.displayName,
  statsLoaded: initialState.userStats.statsLoaded,
  loadUserStats: emptyFunction,
};

export const userCard = {
  deviceMobile: initialState.deviceMobile,
  profile: initialState.user.profile,
};
