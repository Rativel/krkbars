const request = require('supertest')
const app = require('../app')
const bars = require('../datastore/bars')

describe('Listing bars on /bars', function () {
    const list = [{name: 'Test 1', place_id: 't1'}, {name: 'Test 2', place_id: 't2'}, {name: 'Test 3', place_id: 't3'}]

    before(function () {
        bars.set(list)
    })

    it('should return list of bars', function (done) {
        request(app)
            .get('/api/bars')
            .expect(200, list, done)
    })

    it('should return bar by place_id', function (done) {
        request(app)
            .get('/api/bars/t2')
            .expect(200, list.find(b => b.place_id === 't2'), done)
    })

    it('should return 404 when bar is not found', function (done) {
        request(app)
            .get('/api/bars/t4')
            .expect(404, done)
    })
})