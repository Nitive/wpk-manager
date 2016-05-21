# wpk-manager
[![CircleCI](https://circleci.com/gh/Nitive/wpk-manager.svg?style=svg)](https://circleci.com/gh/Nitive/wpk-manager)

> Utility to easy extend webpack config


Example:
```js
const { extend } = require('wpk-manager')

// some preset
// const preset = require('wpk-react-preset')
const preset = {
  bail: true,
  debug: false,
  module: {
    loaders: {
      style: {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      babel: {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      }
    }
  }
}

const myConfig = {
  bail: false,
  // profiles override properties
  profiles: {
    dev: {
      debug: true
      devtool: 'eval',
      loaders: {
        babel: null // disable babel-loader
      }
    }
  }
}

module.exports = extend(preset, myConfig, { profile: 'dev' })
```

It would be transformed into:
```js
{
  bail: false,
  debug: true
  devtool: 'eval',
  module: {
    loaders: {
      style: {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
    }
  }
}
```
