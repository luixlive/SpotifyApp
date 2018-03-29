const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');

const logout = (req, res) => {
  logger.debug(`api/authentication/logout: ${JSON.stringify(req.user)}`);
  req.logout();
  req.session = null;
  res.sendStatus(httpStatus.NO_CONTENT);
};

const spotifyCallback = (req, res) => {
  logger.debug(`api/authentication/spotify/callback: ${JSON.stringify(req.user)}`);
  res.redirect('/stats');
};

const user = (req, res) => {
  logger.debug(`api/authentication/user: ${JSON.stringify(req.user)}`);
  res.send(req.user);
};

module.exports = {
  logout,
  spotifyCallback,
  user,
};
