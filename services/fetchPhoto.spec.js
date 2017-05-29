const expect = require('chai').expect
const fetchPhoto = require('./fetchPhoto')

const apiKey = process.env.GOOGLE_API_KEY
const testBar = require('./testdata.json')

describe('Photo fetch', function () {
    afterEach(function () {
        process.env.GOOGLE_API_KEY = apiKey
    })

    it('should get photo for bull pub', function (done) {
        this.timeout(5000)
        fetchPhoto(testBar.photo.photo_reference)
            .then(photoUrl => {
                expect(photoUrl).to.equal(testBar.photo.url)
                done()
            })
            .catch(err => done(err))
            .catch(err => done(err))
    })

    it('should fail when image not found', function (done) {
        this.timeout(5000)
        fetchPhoto('CmRYAAAA49WLG2CnyDJvQuD8Qjsm')
            .then(photoUrl => done(new Error('Photo should not be found')))
            .catch(response => {
                expect(response.statusCode).to.equal(400)
                done()
            })
    })

    it('should fail when invalid API key provided', function (done) {
        process.env.GOOGLE_API_KEY = 'invalid'
        fetchPhoto(testBar.photo.photo_reference)
            .then(photoUrl => done(new Error('Photo should not be found')))
            .catch(response => {
                expect(response.statusCode).to.equal(403)
                done()
            })
            .catch(err => done(err))
    })
})