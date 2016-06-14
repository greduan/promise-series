'use strict';

var Promise = require('bluebird');

module.exports = function () {
  var funcs = [];

  var promiseSeries = function (func) {
    if (func instanceof Function === false) {
      throw new Error('received argument is not a function');
    }

    funcs.push(func);

    return promiseSeries;
  };

  Object.defineProperty(promiseSeries, 'run', {
    get: function () {
      return function runPromiseSeries () {
        var args = arguments;

        var that = this;

        return Promise.resolve()
          .then(function () {
            return Promise.each(funcs, function (func) {
              return func.apply(that, args);
            });
          });
      };
    },
  });

  return promiseSeries;
};
