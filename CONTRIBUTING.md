# Contributing

Thanks for taking the time to contribute!

To build the library first of all check out the repo and install the required packages:
```shell
$ git clone git@github.com:bodnaristvan/apirequest.git
$ cd apirequest
$ npm install
```
Various build steps can be initiated through npm scripts:
* `npm run build` -- build the minified version, this is needed after every code change
* `npm run test` -- run karma tests in the `test/` directory
* `npm run test:ci` -- run karma tests continuously in the background, watching for file changes

While the base test coverage is not complete yet, please make sure your  proposed changes are covered with test cases!
