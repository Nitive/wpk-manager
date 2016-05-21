exports.test = 'should not transform array of loaders'

exports.expected = {
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
