
exports.test = 'should remove loaders'

exports.options = {
  profile: 'dev',
}

exports.expected = {
  plugins: {
    a: 'a',
    b: 'b',
  },

  profiles: {
    dev: {
      plugins: {
        a: false,
      },
    },
  },
}

exports.actual = {
  plugins: ['b'],
}
