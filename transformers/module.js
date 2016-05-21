const R = require('ramda')

const clear = R.filter(R.identity)

const objToValuesReplacer = key => config => {
  if (
    !config.module ||
    !config.module[key] ||
    Array.isArray(config.module[key])
  ) return config

  const transformedLoaders = clear(R.values(config.module[key]))
  return R.assocPath(['module', key], transformedLoaders, config)
}

module.exports = R.compose(
  objToValuesReplacer('loaders'),
  objToValuesReplacer('preLoaders'),
  objToValuesReplacer('postLoaders')
)
