const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');

const logout = (req, res) => {
  logger.debug(`api/authentication/logout: ${req.logUser}`);
  req.logout();
  req.session = null;
  res.sendStatus(httpStatus.NO_CONTENT);
};

const spotifyCallback = (req, res) => {
  logger.debug(
    'api/authentication/spotify/callback: ',
    req.user.profile._json.display_name,
  );
  res.redirect('/');
};

const user = (req, res) => {
  logger.debug(`api/authentication/user: ${req.logUser}`);
  res.send(req.user.profile);
};

module.exports = {
  logout,
  spotifyCallback,
  user,
};
