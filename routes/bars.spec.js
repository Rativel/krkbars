const request = require('supertest')
const app = require('../app')

describe('Listing bars on /bars', function () {
    it('should return 200', function (done) {
        request(app)
            .get('/bars')
            .expect(200, done)
    })
})