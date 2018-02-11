const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, './src/app/index.jsx')
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'index_bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: './src/app/index.html'
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
