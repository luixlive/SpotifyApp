const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./../../../webpack.config');

/* istanbul ignore next */
module.exports = (app) => {
  const webpackCompiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(webpackCompiler, {}));
  app.use(webpackHotMiddleware(webpackCompiler));
};
