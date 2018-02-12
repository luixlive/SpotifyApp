const config = require('config');
const passport = require('passport');
const { Strategy: SpotifyStrategy } = require('passport-spotify');

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
}, (accessToken, refreshToken, expiresIn, profile, done) => {
  done(null, { profile, accessToken });
}));
