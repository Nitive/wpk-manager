const R = require('ramda')
const isObject = require('is-plain-obj')

const deepMerge = exports.deepMerge = R.mergeWith((left, right) => {
  const isObjects = R.all(isObject)

  if (isObjects([left, right])) {
    return deepMerge(left, right)
  }

  return right
})

