const assert = require('assert');
const config = require('config');
const Joi = require('joi');

const httpStatus = require('./../../utils/http_status');
const { INVALID_JSON_SCHEMA } = require('./../util/error_responses');
const logger = require('./../../utils/logger');

const SCHEMA_TYPES = config.get('SCHEMA_TYPES');
const VALID_TYPES = [SCHEMA_TYPES.TYPE_BODY, SCHEMA_TYPES.TYPE_QUERY];

module.exports = (schema, endpoint, type) => (req, res, next) => {
  assert(
    VALID_TYPES.indexOf(type) !== -1,
    'Invalid type provided for schema validation, expected body or query',
  );

  const { error } = Joi.validate(req[type], schema);
  if (error) {
    logger.error(`${endpoint} schema error ${error.message}: ${req.logUser}`);

    res.status(httpStatus.BAD_REQUEST);
    return res.send({ error: `${INVALID_JSON_SCHEMA}: ${error.message}` });
  }
  return next();
};
