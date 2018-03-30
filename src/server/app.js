const bodyParser = require('body-parser');
const config = require('config');
const cookieSession = require('cookie-session');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const apiRouter = require('./routers');
const logger = require('./../utils/logger');
const swaggerRouter = require('./swagger');
const webpackConfig = require('./../../webpack.config');

const app = express();
const environment = config.util.getEnv('NODE_ENV');

logger.info(`Spotify App started in ${config.util.getEnv('NODE_ENV')} mode`);

require('./services/passport').configurePassport(passport);

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [config.get('COOKIE_KEY')],
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

/* istanbul ignore next  */
if (environment !== 'production') {
  app.use('/swagger', swaggerRouter);
}

const webpackCompiler = webpack(webpackConfig);
switch (environment) {
  /* istanbul ignore next */
  case 'development':
    app.use(webpackMiddleware(webpackCompiler, {}));
    app.use(webpackHotMiddleware(webpackCompiler));
    break;
  case 'test':
    app.get('/test', (req, res) => {
      res.sendStatus(200);
    });
    break;
  /* istanbul ignore next */
  default:
    app.use(express.static(path.join(__dirname, './../../dist')));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../../dist', 'index.html'));
});

module.exports = app;
