exports.test = 'should not transform anything else'

exports.expected = {
  bail: false,
  module: {},

  profiles: {
    dev: {
      debug: true,
      devtool: 'eval',
    },
    prod: {
      devtool: '#source-map',
    },
  },
}

exports.actual = {
  devtool: 'eval',
  bail: false,
  debug: true,
  module: {},
}
