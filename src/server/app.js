const bodyParser = require('body-parser');
const config = require('config');
const cookieSession = require('cookie-session');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const path = require('path');

const apiRouter = require('./routers');
const logger = require('./../utils/logger');
const serveGzipped = require('./util/serve_gzipped');
const setDevelopmentWebpack = require('./util/set_development_webpack');
const swaggerRouter = require('./swagger');

const app = express();
const environment = config.util.getEnv('NODE_ENV');

logger.info(`Spotify App started in ${config.util.getEnv('NODE_ENV')} mode`);

require('./services/passport').configurePassport(passport);

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.get('COOKIE_KEY')],
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

/* istanbul ignore next */
if (environment !== 'production') {
  app.use('/swagger', swaggerRouter);
}

switch (environment) {
  /* istanbul ignore next */
  case 'development':
    setDevelopmentWebpack(app);
    break;
  case 'test':
    app.get('/test', (req, res) => {
      res.sendStatus(200);
    });
    break;
  /* istanbul ignore next */
  default:
    app.get('*.js', serveGzipped('text/javascript'));
    app.get('*.css', serveGzipped('text/css'));
    app.use(express.static(path.join(__dirname, './../../dist')));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../../dist', 'index.html'));
});

module.exports = app;
