const R = require('ramda')

const deepMerge = exports.deepMerge = R.mergeWith((left, right) => {
  const isObjects = R.all(R.is(Object))

  if (isObjects([left, right])) {
    return deepMerge(left, right)
  }

  return right
})

