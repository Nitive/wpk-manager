const R = require('ramda')

// check variable is an object, not an array
const isObject = variable => {
  return variable.constructor === Object
}

const checkOptions = (config, options) => {
  const optionsList = R.keys(options)
  const allowedOptions = ['profile']
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
}

const setDefaultOptions = options => {
  return options || {}
}

exports.transform = R.curry((config, opts) => {
  checkOptions(config, opts)
  const options = setDefaultOptions(opts)

  if (config.profiles) {
    const profiles = config.profiles

    const profileConfig = profiles[options.profile] || {}
    console.log(profileConfig)
    const configWithAppliedProfile = R.merge(config, profileConfig)

    return R.dissoc('profiles', configWithAppliedProfile)
  }

  return config
})
