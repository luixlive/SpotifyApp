const _ = require('lodash');
const config = require('config');
const { Strategy: SpotifyStrategy } = require('passport-spotify');

const cleanProfileProperties = ({ _json }) => ({
  displayName: _.get(_json, 'display_name'),
  spotifyUrl: _.get(_json, 'external_urls.spotify'),
  followers: _.get(_json, 'followers.total'),
  id: _.get(_json, 'id'),
  imageUrl: _.get(_json, 'images[0].url'),
  type: _.get(_json, 'type'),
});

const spotifyStrategyCallback = (
  accessToken,
  refreshToken,
  expiresIn,
  profile,
  done,
) => {
  const cleanProfile = cleanProfileProperties(profile);
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
