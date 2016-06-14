# promise-series

## Installation

ATM it's not published on NPM so you'll have to do it manually if you want to
use it in your projects.

```
$ git clone https://github.com/greduan/promise-series.git
$ cd promise-series
$ npm i
$ npm link
```

## Usage

```
var newSeries = require('promise-series');

var ser = newSeries();

ser(function (a, b) {
  // return Promise or sync function
});

ser(function (a, b) {
  // return Promise or sync function
});

// 1 and 2 are a and b in the funcs
ser.run(1, 2); // => Promise for when the above two funcs finish
```

## License

Licensed under the permissive ISC license.  Check the `LICENSE` file for further
details.
