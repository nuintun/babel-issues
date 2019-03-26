/**
 * @module WarningsFilterPlugin
 * @listens MIT
 * @author nuintun
 * @description Filter Plugin.
 * @see https://github.com/geowarin/friendly-errors-webpack-plugin/issues/75
 */

'use strict';

module.exports = class WarningsFilterPlugin {
  constructor({ exclude }) {
    this.exclude = exclude;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('WarningsFilterPlugin', compilation => {
      compilation.warnings = compilation.warnings.filter(warning => !this.exclude.test(warning.message));
    });
  }
};
