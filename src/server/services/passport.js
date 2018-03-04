const _ = require('lodash');
const config = require('config');
const passport = require('passport');
const { Strategy: SpotifyStrategy } = require('passport-spotify');

const logger = require('./../../utils/logger');

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(_.pick(user, config.get('SESSION_VALUES'))));
});

passport.deserializeUser((user, done) => {
  done(null, JSON.parse(user));
});

passport.use(new SpotifyStrategy({
  clientID: config.get('SPOTIFY_CLIENT_ID'),
  clientSecret: config.get('SPOTIFY_CLIENT_SECRET'),
  callbackURL: config.get('SPOTIFY_CALLBACK_URL'),
}, (accessToken, refreshToken, expiresIn, profile, done) => {
  logger.debug(`User retrieved successfully: ${profile}`);
  done(null, { accessToken, profile, refreshToken });
}));

module.exports = passport;
