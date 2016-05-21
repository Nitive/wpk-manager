/* eslint-disable comma-dangle */

exports.test = 'example from README.md'

exports.options = { profile: 'dev' }

exports.expected = {
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
  },
  profiles: {
    dev: {
      debug: true,
      devtool: 'eval',
      module: {
        loaders: {
          babel: false // disable babel-loader
        }
      }
    }
  }
}

exports.actual = {
  bail: true,
  debug: true,
  devtool: 'eval',
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss']
    }]
  }
}
