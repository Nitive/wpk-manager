const R = require('ramda')

// check variable is an object, not an array
const isObject = variable => {
  return variable.constructor === Object
}

const checkOptions = (config, options) => {
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
