exports.test = 'should apply profiles'

exports.options = {
  profile: 'dev',
}

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
