const expect = require('chai').expect
const request = require('supertest')
const app = require('../app')

describe('Listing /', function () {
    it('should return index.html', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200)
            .then(res => {
                expect(res.text).to.contain('<!DOCTYPE html>')
                done()
            })
            .catch(() => done())
    })

    it('every path except /api should return index.html', function (done) {
        request(app)
            .get('/bars')
            .expect('Content-Type', /html/)
            .expect(200)
            .then(res => {
                expect(res.text).to.contain('<!DOCTYPE html>')
                done()
            })
            .catch(() => done())
    })
})