const request = require('supertest')
const app = require('../app')

describe('Listing /', function () {
    it('should return 200', function (done) {
        request(app)
            .get('/')
            .expect(200, done)
    })

    it('should return index.html', function (done) {
        request(app)
            .get('/')
            .expect('index.html', done)
    })
})