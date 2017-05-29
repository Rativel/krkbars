
const request = require('supertest')
const app = require('../app')
const photosStore = require('../datastore/photos')

describe('Getting photo from /api/photos', function () {
    const photos = {p1: 'data_rp1', p2: 'data_rp2', p3: 'data_rp3'}

    before(function () {
        photosStore.set('p1', photos.p1)
        photosStore.set('p2', photos.p2)
        photosStore.set('p3', photos.p3)
    })

    it('should return bad request', function (done) {
        request(app)
            .get('/api/photos')
            .expect(400, done)
    })

    it('should return bar by place_id', function (done) {
        request(app)
            .get('/api/photos/p2')
            .expect('Location', photos.p2)
            .expect(302, done)
    })

    it('should return 404 when bar is not found', function (done) {
        request(app)
            .get('/api/photos/p4')
            .expect(404, done)
    })
})
