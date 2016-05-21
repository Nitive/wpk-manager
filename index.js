const R = require('ramda')
const merge = require('merge').recursive


const isFunctions = R.all(R.is(Function))


const transformer = R.compose(
  require('./transformers/module'),
  require('./transformers/plugins')
)


// check variable is an object, not an array
const isObject = variable => {
  return variable.constructor === Object
}


const checkOptions = (config, options) => {
  const optionsList = R.keys(options)
  const allowedOptions = ['profile', 'transformers']
  const isAllowedOption = R.contains(R.__, allowedOptions)
  const isNotAllowedOption = R.complement(isAllowedOption)
  const allOptionsIsAllowed = R.all(isAllowedOption, optionsList)

  if (!allOptionsIsAllowed) {
    const wrongOption = R.find(isNotAllowedOption, optionsList)
    throw new Error(`Unexpected options '${wrongOption}'`)
  }

  if (config.profiles && !isObject(config.profiles)) {
    throw new Error('A profiles option have to be an object')
  }

  if (options.profile) {
    const profilesList = R.keys(config.profiles || {})
    if (profilesList.length === 0) {
      throw new Error('Not found any profiles')
    }
    if (!R.contains(options.profile, profilesList)) {
      throw new Error('Profile is not defined')
    }
  }


  if (
    options.transformers &&
    (!Array.isArray(options.transformers) ||
    !isFunctions(options.transformers))
  ) {
    throw new Error('An option `transformers` should be an array of functions')
  }
}


const setDefaultOptions = options => {
  return options || {}
}




const transform = exports.transform = R.curry((config, opts) => {
  checkOptions(config, opts)
  const options = setDefaultOptions(opts)

  const applyTransforms = R.apply(
    R.compose,
    R.concat(options.transformers || [], transformer)
  )

  if (config.profiles) {
    const profiles = config.profiles

    const profileConfig = profiles[options.profile] || {}
    const configWithAppliedProfile = merge(config, profileConfig)

    return applyTransforms(R.dissoc('profiles', configWithAppliedProfile))
  }

  return applyTransforms(config)
})


exports.extend = (...args) => {
  const configs = args.slice(0, -1)
  const options = args.slice(-1)[0]
  return transform(R.apply(merge, configs), options)
}
