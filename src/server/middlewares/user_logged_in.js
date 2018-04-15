const config = require('config');
const crypto = require('crypto');
const Joi = require('joi');

const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');
const { userSchema } = require('./../schemas');

const createLogUserValue = (req) => {
  const now = new Date();
  const day = `0${now.getDate()}`.slice(-2);
  const month = `0${now.getMonth() + 1}`.slice(-2);
  const year = now.getFullYear();

  const salt = `${year}${month}${day}`;
  const data = `${req.user.profile.id}${salt}`;

  const hmac = crypto.createHmac('sha256', config.get('LOGGING_PASSPHRASE'));
  hmac.update(data);
  req.logUser = hmac.digest('base64');
};

module.exports = (req, res, next) => {
  if (req.user) {
    const { error } = Joi.validate(req.user, userSchema);
    if (!error) {
      createLogUserValue(req);

      logger.info(`User authorized: ${req.logUser}`);

      return next();
    }
    logger.error(`Session inconsistency ${error}`);
  }
  return res.sendStatus(httpStatus.UNAUTHORIZED);
};
