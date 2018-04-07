const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');

const logout = (req, res) => {
  logger.debug(`api/authentication/logout: ${req.logUser}`);
  req.logout();
  req.session = null;
  res.sendStatus(httpStatus.NO_CONTENT);
};

const keepSessionAlive = (req, res) => {
  logger.debug(`api/authentication/keepSessionAlive: ${req.logUser}`);
  const oneMinuteFromNow = Date.now() + (60 * 1000);
  if (oneMinuteFromNow >= req.user.expires) {
    // Refresh token
  }
  res.sendStatus(httpStatus.NO_CONTENT);
};

const spotifyCallback = (req, res) => {
  logger.debug('api/authentication/spotify/callback: ', req.logUser);
  res.redirect('/');
};

const user = (req, res) => {
  logger.debug(`api/authentication/user: ${req.logUser}`);
  res.send(req.user.profile);
};

module.exports = {
  keepSessionAlive,
  logout,
  spotifyCallback,
  user,
};
