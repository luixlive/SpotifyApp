const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');
const { SESSION_EXPIRED } = require('./../util/error_responses');

module.exports = (req, res, next) => {
  const oneMinuteFromNow = Date.now() + (60 * 1000);
  if (oneMinuteFromNow >= req.user.expires) {
    logger.info(`Session expired: ${req.logUser}`);

    res.status(httpStatus.UNAUTHORIZED);
    return res.send({ error: SESSION_EXPIRED });
  }
  return next();
};
