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

