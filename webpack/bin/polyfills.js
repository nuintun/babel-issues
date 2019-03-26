/**
 * @module polyfills
 * @listens MIT
 * @author nuintun
 * @description Polyfills
 * @see https://github.com/facebook/create-react-app/blob/next/packages/react-scripts/config/webpack.config.dev.js
 */

// ES6 shim
import 'es6-shim';

// Promise finally polyfill
if (typeof Promise.prototype.finally !== 'function') {
  Promise.prototype.finally = function always(onFinally) {
    const Promise = this.constructor;

    // Must be a function
    if (typeof onFinally !== 'function') {
      return this;
    }

    // Finally
    return this.then(
      function(value) {
        return Promise.resolve(onFinally()).then(function() {
          return value;
        });
      },
      function(reason) {
        return Promise.resolve(onFinally()).then(function() {
          throw reason;
        });
      }
    );
  };
}

// Browser fetch polyfill
import '@nuintun/fetch';
