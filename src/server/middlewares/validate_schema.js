const Joi = require('joi');

const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');

module.exports = (schema, endpoint) => (req, res, next) => {
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    logger.error(`${endpoint} - Schema error: ${error.message}.`);
    return res.status(httpStatus.BAD_REQUEST)
      .send({ error: `JSON schema error: ${error.message}` });
  }
  return next();
};
