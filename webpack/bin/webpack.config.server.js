/**
 * @module webpack.config.server
 * @listens MIT
 * @author nuintun
 * @description Webpack development configure.
 * @see https://github.com/facebook/create-react-app/blob/next/packages/react-scripts/config/webpackDevServer.config.js
 */

'use strict';

const koa = require('koa');
const webpack = require('webpack');
const pkg = require('../../package.json');
const loaders = require('../lib/loaders');
const koaWebpack = require('koa-webpack');
const koaCompress = require('koa-compress');
const getLocalExternalIP = require('../lib/ip');
const configure = require('./webpack.config.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { publicPath, sourceMapExclude, watchOptions, entryHTML } = require('../configure');

const app = new koa();
const mode = 'development';

process.env.NODE_ENV = mode;
process.env.BABEL_ENV = mode;

app.use(koaCompress());

const server = app.listen(() => {
  const ip = getLocalExternalIP();
  const port = server.address().port;
  const devServerHost = `//${ip}:${port}`;
  const devServerPublicPath = devServerHost + publicPath;

  configure.mode = mode;
  configure.stats = 'none';
  configure.devtool = 'none';
  configure.entry = configure.entry.concat('webpack-hot-client/client');
  configure.output = Object.assign(configure.output, {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: devServerPublicPath
  });
  configure.plugins = [
    ...configure.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new webpack.EnvironmentPlugin({ DEBUG: true, NODE_ENV: mode }),
    new webpack.SourceMapDevToolPlugin({ exclude: sourceMapExclude })
  ];
  configure.module.rules = loaders(true);

  const compiler = webpack(configure);

  compiler.name = pkg.name;

  koaWebpack({
    compiler,
    hotClient: {
      host: ip,
      logLevel: 'silent',
      autoConfigure: false
    },
    devMiddleware: {
      watchOptions,
      logLevel: 'silent',
      writeToDisk: file => file === entryHTML,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true }
    }
  }).then(middleware => {
    app.use(middleware);
  });
});
