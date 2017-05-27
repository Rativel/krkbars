const request = require('supertest')
const app = require('../app')
const bars = require('../datastore/bars')

describe('Listing bars on /bars', function () {
    it('should return 200', function (done) {
        request(app)
            .get('/api/bars')
            .expect(200, done)
    })

    it('should return list of bars', function (done) {
        const list = [{name: 'test'}]
        bars.set(list)
        request(app)
            .get('/api/bars')
            .expect(list, done)
    })
})