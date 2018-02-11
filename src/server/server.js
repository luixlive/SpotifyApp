const config = require('config');
const express = require('express');
const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
/* eslint-enable import/no-extraneous-dependencies */

const app = require('./app');
const logger = require('./../utils/logger');
const webpackConfig = require('./../../webpack.config');

const environment = config.util.getEnv('NODE_ENV');
const port = config.get('PORT');

if (environment === 'development') {
  const webpackCompiler = webpack(webpackConfig);

  app.use(webpackMiddleware(webpackCompiler, {}));
  app.use(webpackHotMiddleware(webpackCompiler));
} else {
  app.use(express.static(path.join(__dirname, './../../dist')));
}

app.listen(port, () => {
  logger.info(`Spotify App listening at http://${config.get('HOST')}:${port}`);
});
