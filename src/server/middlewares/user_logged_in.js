const Joi = require('joi');

const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');
const { userSchema } = require('./../schemas');

module.exports = (req, res, next) => {
  if (req.user) {
    const { error } = Joi.validate(req.user, userSchema);
    if (!error) {
      req.logUser = req.user.profile.displayName;
      logger.debug(`User authorized: ${req.logUser}`);
      return next();
    }
    logger.debug(`Session inconsistency: ${error}`);
  }
  logger.debug('User unauthorized');
  return res.sendStatus(httpStatus.UNAUTHORIZED);
};
