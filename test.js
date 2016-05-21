const { transform } = require('./')
const fs = require('fs')
require('chai').should()

describe('fixtures', () => {
  const files = fs.readdirSync('./fixtures')
  files.forEach(file => {
    const fixture = require(`./fixtures/${file}`)
    it(fixture.test, () => {
      transform(fixture.expected).should.be.deep.equal(fixture.actual)
    })
  })
})
