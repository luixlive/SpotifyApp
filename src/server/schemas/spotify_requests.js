const Joi = require('joi');

module.exports = {
  topArtistsOptions: Joi.object().keys({
    limit: Joi.number().integer().min(1).max(50)
      .optional(),
    offset: Joi.number().integer().min(0).optional(),
    timeRange: Joi.string().valid(['long_term', 'medium_term', 'short_term'])
      .optional(),
  }),
};
