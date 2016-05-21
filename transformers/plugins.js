const R = require('ramda')

module.exports = config => {
  if (!config.plugins || Array.isArray(config.plugins)) return config

  return R.assoc('plugins', R.values(config.plugins), config)
}
