exports.test = 'should not transform plugins if it is array'

// as string to easy compare in tests
const plugin = 'some plugin'

exports.expected = {
  plugins: [plugin],
}

exports.actual = {
  plugins: [plugin],
}
