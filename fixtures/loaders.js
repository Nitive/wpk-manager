exports.test = 'should transform loaders'

exports.expected = {
  module: {
    loaders: {
      babel: {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      postcss: {
        test: /\.css$/,
        loader: 'style!css!postcss',
      },
    },
  },
}

exports.actual = {
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss',
    }],
  },
}
