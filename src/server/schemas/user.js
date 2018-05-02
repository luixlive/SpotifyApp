const Joi = require('joi');

module.exports = Joi.object().keys({
  accessToken: Joi.string().min(1).required(),
  expires: Joi.number().integer().positive().required(),
  profile: Joi.object().keys({
    displayName: Joi.string(),
    spotifyUrl: Joi.string().uri().required(),
    followers: Joi.number().integer().min(0).required(),
    id: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
    type: Joi.string().required(),
  }).required(),
  refreshToken: Joi.string().min(1).required(),
});
