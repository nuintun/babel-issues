/**
 * @module configure
 * @listens MIT
 * @author nuintun
 * @description Paths configure.
 */

'use strict';

const path = require('path');

module.exports = {
  title: 'Babel issues',
  publicPath: '/Assets/dist/',
  context: path.resolve('Assets/src'),
  entryHTML: path.resolve('index.html'),
  outputPath: path.resolve('Assets/dist'),
  entry: [require.resolve('./bin/polyfills.js'), path.resolve('Assets/src/js/pages/App.jsx')],
  alias: {
    '~src': path.resolve('Assets/src'),
    '~js': path.resolve('Assets/src/js'),
    '~css': path.resolve('Assets/src/css'),
    '~fonts': path.resolve('Assets/src/fonts'),
    '~images': path.resolve('Assets/src/images')
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    repl: 'empty',
    dgram: 'empty',
    module: 'empty',
    cluster: 'empty',
    readline: 'empty',
    child_process: 'empty'
  },
  stats: {
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    entrypoints: false,
    modules: false,
    moduleTrace: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: false,
    warningsFilter: warning => !/\[mini-css-extract-plugin\]\nConflicting order between:/.test(warning.message)
  },
  performance: {
    hints: false
  },
  modules: [path.resolve('Assets/src'), path.resolve('node_modules')],
  recordsPath: path.resolve('node_modules/.cache/webpack/records.json'),
  sourceMapExclude: /[\\/](runtime|react|antd|antv|vendor-[^\\/]+)\.(js|css)$/i,
  watchOptions: { ignored: path => !/[\\/]Assets[\\/]src[\\/]/.test(path), aggregateTimeout: 300 },
  noParse: [/[\\/]node_modules[\\/]moment[\\/]moment\.js/i, /[\\/]node_modules[\\/]@nuintun[\\/](fetch|promise)[\\/]/i]
};
