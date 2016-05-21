const R = require('ramda')

const objToValuesReplacer = key => config => {
  if (!config.module || !config.module[key]) return config

  const transformedLoaders = R.values(config.module[key])
  return R.assocPath(['module', key], transformedLoaders, config)
}

module.exports = R.compose(
  objToValuesReplacer('loaders'),
  objToValuesReplacer('preLoaders'),
  objToValuesReplacer('postLoaders')
)
