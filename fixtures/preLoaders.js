exports.test = 'should transform preLoaders'

exports.expected = {
  module: {
    preLoaders: {
      eslint: {
        test: /\.js$/,
        loaders: ['eslint'],
        exclude: /node_modules/,
      },
    },
  },
}

exports.actual = {
  module: {
    preLoaders: [{
      test: /\.js$/,
      loaders: ['eslint'],
      exclude: /node_modules/,
    }],
  },
}
