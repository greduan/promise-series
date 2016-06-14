'use strict';

var assert = require('assert');
var td = require('testdouble');

var ser = require('..');

describe('promise-series', function () {

  it('Should return a function', function () {
    var res = ser();

    assert(typeof res, 'function');
  });

  it('Should return a function with a .run method', function () {
    var res = ser();

    assert(typeof res.run, 'function');
  });

  it('Should return rejected Promise when returned function is called without function', function () {
    try {
      var res = ser()(1);
    } catch (err) {
      assert(err instanceof Error, true);
      assert(err, 'received argument is not a function');
    }
  });

  it('Should, when called once, return a function with a .run method', function () {
    var res = ser()(function () {});

    assert(typeof res.run, 'function');
  })

  it('Should return Promise when .run is called', function () {
    var res = ser()(function () {});

    var prom = res.run();

    assert(typeof prom.then, 'function');
  });

  it('Should run passed in functions', function () {
    var f = td.function();
    var res = ser();

    res(function () {
      f('one');
    });

    res(function () {
      f('one');
    })

    return res.run()
      .then(function () {
        td.verify(f('one'), { times: 2 });
      });
  });

  it('Should run passed in functions in order', function () {
    var f = td.function();
    var res = ser();

    res(function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          f('one');

          resolve();
        }, 100);
      });
    });

    res(function () {
      f('two');

      return Promise.resolve();
    });

    return res.run()
      .then(function () {
        // TODO: This doesn't test for order properly
        td.verify(f('one'));
        td.verify(f('two'));
      });
  });

});
