bootstrap-select2
=================

Utility project to merge original select2 code &amp; bootstrap 3 styles into single file

## Compiling CSS and JavaScript

We use [Grunt](http://gruntjs.com/) to build this utility.
To use it, you would have to install the required dependencies as described below.

### Install Grunt and it's dependencies

1. Install `grunt` globally with `npm install -g grunt-cli`.
2. Go to project root directory and run `npm install` - this will install all required dependencies.

### Available build targets

#### Build

```
grunt build
```

This will download all compile time dependencies, compile LESS files, minimize and uglify all resources. Everything will be saved to `/dist` directory.

#### Clean

```
grunt clean
```

Removes everything except `/dist`

### Troubleshooting

In case of emergency - break the glass, then - rerun `npm install`.

## Dependencies

* [select2](https://github.com/InWayOpenSource/select2) - originally by [@ivaynberg](https://github.com/ivaynberg/select2) under [the Apache 2.0 license](https://github.com/ivaynberg/select2/blob/master/LICENSE)
* [bootstrap-select2-css](https://github.com/InWayOpenSource/bootstrap-select2-css) - originally by [@t0m](https://github.com/t0m/select2-bootstrap-css) under [the MIT license](https://github.com/t0m/select2-bootstrap-css/blob/master/LICENSE)

## License

Code released under [the Apache 2.0 license](LICENSE).


