const _ = require('lodash');
const Joi = require('joi');

const logger = require('./../../utils/logger');
const { userSchema } = require('./../schemas');

module.exports = (req, changes) => {
  const newSession = _.merge(
    {},
    JSON.parse(req.session.passport.user),
    changes,
  );
  const { error } = Joi.validate(newSession, userSchema);

  if (error) {
    logger.error(`Invalid session update: ${error}`);
  } else {
    req.session.passport.user = JSON.stringify(newSession);

    logger.info(`User's session updated: ${req.logUser}`);
  }
};
