/**
 * @module webpack.config.dev
 * @listens MIT
 * @author nuintun
 * @description Webpack development configure.
 * @see https://github.com/facebook/create-react-app/blob/next/packages/react-scripts/config/webpack.config.dev.js
 */

'use strict';

const webpack = require('webpack');
const loaders = require('../lib/loaders');
const configure = require('./webpack.config.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { sourceMapExclude, watchOptions } = require('../configure');

const mode = 'development';

process.env.NODE_ENV = mode;
process.env.BABEL_ENV = mode;

configure.mode = mode;
configure.devtool = 'none';
configure.output = Object.assign(configure.output, {
  filename: 'js/[name].js',
  chunkFilename: 'js/[name].js'
});
configure.plugins = [
  ...configure.plugins,
  new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
  new webpack.EnvironmentPlugin({ DEBUG: true, NODE_ENV: mode }),
  new webpack.SourceMapDevToolPlugin({ exclude: sourceMapExclude })
];
configure.module.rules = loaders();
configure.watchOptions = watchOptions;

module.exports = configure;
