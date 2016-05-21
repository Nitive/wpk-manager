const R = require('ramda')

const clear = R.filter(R.identity)

module.exports = config => {
  if (!config.plugins || Array.isArray(config.plugins)) return config

  return R.assoc('plugins', clear(R.values(config.plugins)), config)
}
