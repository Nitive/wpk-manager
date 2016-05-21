/* eslint-disable no-unused-expressions */

const fs = require('fs')
const { transform } = require('./')
require('chai').should()

describe('fixtures', () => {
  const files = fs.readdirSync('./fixtures')
  files.forEach(file => {
    const fixture = require(`./fixtures/${file}`)
    it(fixture.test, () => {
      // transform(fixture.expected, {}).should.be.deep.equal(fixture.actual)
    })
  })
})

describe('types', () => {
  it('curryng works', () => {
    const fixture = require('./fixtures/plain.js')
    transform(fixture.expected).should.be.a('function')
    transform(fixture.expected)({}).should.be.an('object')
  })
})

describe('options', () => {
  it('should throws if passed unexpected option', () => {
    const config = { }
    const opts = { wrong: 1 }
    ;(() => transform(config, opts)).should.throw('Unexpected options \'wrong\'')
  })

  it('should throws if profiles is not an object', () => {
    const config = { profiles: [] }
    const opts = { profile: 'prod' }
    ;(() => transform(config, opts)).should.throw('A profiles option have to be an object')
  })

  it('should throws if passed profile but profiles not defined', () => {
    const config = {}
    const opts = { profile: 'prod' }
    ;(() => transform(config, opts)).should.throw('Not found any profiles')
  })

  it('should throws if passed not defined profile', () => {
    const config = { profiles: { dev: {} } }
    const opts = { profile: 'prod' }
    ;(() => transform(config, opts)).should.throw('Profile is not defined')
  })
})