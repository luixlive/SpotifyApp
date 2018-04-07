const config = require('config');
const { Strategy: SpotifyStrategy } = require('passport-spotify');

const logger = require('./../../utils/logger');

const cleanProfileProperties = ({ _json }) => ({
  displayName: _json.display_name,
  externalUrls: _json.external_urls,
  followers: _json.followers,
  href: _json.href,
  id: _json.id,
  images: _json.images,
  type: _json.type,
  uri: _json.uri,
});

const spotifyStrategyCallback = (
  accessToken,
  refreshToken,
  expiresIn,
  profile,
  done,
) => {
  const cleanProfile = cleanProfileProperties(profile);
  logger.debug(`User retrieved successfully: ${JSON.stringify(cleanProfile)}`);
  done(null, {
    accessToken,
    expires: Date.now() + (expiresIn * 1000),
    profile: cleanProfile,
    refreshToken,
  });
};

const configurePassport = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
  });

  passport.deserializeUser((user, done) => {
    done(null, JSON.parse(user));
  });

  passport.use(new SpotifyStrategy({
    clientID: config.get('SPOTIFY_CLIENT_ID'),
    clientSecret: config.get('SPOTIFY_CLIENT_SECRET'),
    callbackURL: config.get('SPOTIFY_CALLBACK_URL'),
  }, spotifyStrategyCallback));
};

module.exports = {
  configurePassport: passport => configurePassport(passport),
  spotifyStrategyCallback,
};
