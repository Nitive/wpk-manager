exports.test = 'should transform plugins'

// as string to easy compare in tests
const plugin = 'some plugin'

exports.expected = {
  plugins: {
    plugin,
  },
}

exports.actual = {
  plugins: [plugin],
}
