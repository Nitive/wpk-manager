/* eslint-disable no-unused-expressions */

const fs = require('fs')
const R = require('ramda')
const wpk = require('./')
const deepMerge = require('./utils').deepMerge
require('chai').should()

describe('fixtures', () => {
  const files = fs.readdirSync('./fixtures')
  files.forEach(file => {
    const fixture = require(`./fixtures/${file}`)
    it(fixture.test, () => {
      const result = wpk.transform(fixture.expected, fixture.options || {})
      result.should.be.deep.equal(fixture.actual)
    })
  })
})

describe('types', () => {
  it('curryng works', () => {
    const fixture = require('./fixtures/plain.js')
    wpk.transform(fixture.expected).should.be.a('function')
    wpk.transform(fixture.expected)({}).should.be.an('object')
  })
})

describe('options', () => {
  it('should throws if passed unexpected option', () => {
    const config = { }
    const opts = { wrong: 1 }
    ;(() => wpk.transform(config, opts)).should.throw('Unexpected option \'wrong\'')
  })

  it('should throws if profiles is not an object', () => {
    const config = { profiles: [] }
    const opts = { profile: 'prod' }
    ;(() => wpk.transform(config, opts)).should.throw('An option `profiles` have to be an object')
  })

  it('should throws if passed profile but profiles not defined', () => {
    const config = {}
    const opts = { profile: 'prod' }
    ;(() => wpk.transform(config, opts)).should.throw('Not found any profiles')
  })

  it('should throws if passed not defined profile', () => {
    const config = { profiles: { dev: {} } }
    const opts = { profile: 'prod' }
    ;(() => wpk.transform(config, opts)).should.throw('A profile is not defined')
  })

  it('should throws if passed not valid transformers', () => {
    const config = {}
    const opts = { transformers: () => 1 }
    ;(() => wpk.transform(config, opts))
      .should.throw('An option `transformers` should be an array of functions')
  })

  it('should allow to use custom transformers', () => {
    const config = { counter: 1 }
    const updateCounter = R.assoc('counter', 2)
    const opts = {
      transformers: [updateCounter],
    }
    wpk.transform(config, opts).should.be.deep.equal({
      counter: 2,
    })
  })
})

describe('extend', () => {
  it('should merge configs', () => {
    wpk.extend([{ one: 1 }, { two: 2 }], {}).should.be.deep.equal({
      one: 1,
      two: 2,
    })
  })

  it('should merge more than two configs', () => {
    wpk.extend([{ one: 1 }, { two: 2 }, { three: 3 }], {}).should.be.deep.equal({
      one: 1,
      two: 2,
      three: 3,
    })
  })

  it('should apply options', () => {
    const config = {
      two: 2,
      profiles: {
        dev: {
          withProfile: true,
        },
      },
    }

    wpk.extend([{ one: 1 }, config], { profile: 'dev' }).should.be.deep.equal({
      one: 1,
      two: 2,
      withProfile: true,
    })
  })
})

describe('merge', () => {
  const test = (propmt, left, right, result) => {
    it(propmt, () => {
      deepMerge(left, right).should.be.deep.equal(result)
    })
  }

  test('should merge empty objects', {}, {}, {})

  test('should rewrite equal keys', { a: 1 }, { a: 2 }, { a: 2 })

  test(
    'should add new keys',
    { a: 1 },
    { b: 2 },
    { a: 1, b: 2 }
  )

  test(
    'should deep rewrite new keys',
    { a: { b: 2 } },
    { a: { b: 3 } },
    { a: { b: 3 } }
  )

  test(
    'should not lose keys',
    { a: { b: 2, d: 4 } },
    { a: { b: 3 } },
    { a: { b: 3, d: 4 } }
  )

  test(
    'should not lose deep keys',
    { a: { d: 4 } },
    { a: { b: { c: 3 } } },
    { a: { b: { c: 3 }, d: 4 } }
  )
})
