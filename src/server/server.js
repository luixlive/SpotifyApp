const config = require('config');
const express = require('express');
const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
/* eslint-enable import/no-extraneous-dependencies */

const logger = require('./../utils/logger');
const webpackConfig = require('./../../webpack.config');

const app = express();
const environment = config.get('NODE_ENV');
const port = config.get('PORT');

logger.info(`Spotify App started in ${environment} mode`);

if (environment === 'dev') {
  const webpackCompiler = webpack(webpackConfig);

  app.use(webpackMiddleware(webpackCompiler, {}));
  app.use(webpackHotMiddleware(webpackCompiler));
} else {
  app.use(express.static(path.join(__dirname, './../../dist')));
}

app.listen(3000, () => {
  logger.info(`Spotify App listening at http://${config.get('HOST')}:${port}`);
});
