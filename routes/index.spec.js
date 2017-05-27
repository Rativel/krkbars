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

    it('every other call then /api should return index.html', function (done) {
        request(app)
            .get('/bars')
            .expect(200, 'index.html', done)
    })
})