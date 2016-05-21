exports.test = 'should transform postLoaders'

exports.expected = {
  module: {
    postLoaders: {
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
    postLoaders: [{
      test: /\.js$/,
      loaders: ['eslint'],
      exclude: /node_modules/,
    }],
  },
}
