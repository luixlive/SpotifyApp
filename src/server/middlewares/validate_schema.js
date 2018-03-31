const Joi = require('joi');

const httpStatus = require('./../../utils/http_status');
const { INVALID_JSON_SCHEMA } = require('./../util/error_responses');
const logger = require('./../../utils/logger');

module.exports = (schema, endpoint) => (req, res, next) => {
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    logger.error(`${endpoint} - Schema error: ${error.message}.`);
    res.status(httpStatus.BAD_REQUEST);
    return res.send({ error: `${INVALID_JSON_SCHEMA}: ${error.message}` });
  }
  return next();
};
