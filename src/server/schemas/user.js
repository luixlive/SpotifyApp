const Joi = require('joi');

module.exports = Joi.object().keys({
  accessToken: Joi.string().required(),
  expires: Joi.number().integer().positive().required(),
  profile: Joi.object().keys({
    displayName: Joi.string().required(),
    spotifyUrl: Joi.string().required(),
    followers: Joi.number().integer().min(0).required(),
    id: Joi.string().required(),
    imageUrl: Joi.string().required(),
    type: Joi.string().required(),
  }).required(),
  refreshToken: Joi.string().required(),
});
