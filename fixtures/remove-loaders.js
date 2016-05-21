
exports.test = 'should remove loaders'

exports.options = {
  profile: 'dev',
}

exports.expected = {
  module: {
    loaders: {
      a: { loader: ['a'] },
      b: { loader: ['b'] },
    },
  },

  profiles: {
    dev: {
      module: {
        loaders: {
          a: false,
        },
      },
    },
  },
}

exports.actual = {
  module: {
    loaders: [{ loader: ['b'] }],
  },
}
