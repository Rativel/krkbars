const expect = require('chai').expect
const fetchPhoto = require('./fetchPhoto')

const apiKey = process.env.GOOGLE_API_KEY
const bullPubPhotoId = 'CmRYAAAA49WLG2CnyDJvQuD8Qjsm1Re9dYJzo2sLK3bzgdxpNFYUF9T1FvchkmCqd5-Gp2Wg5NalV1Kszy7_t_VQUU6jg0Sji3xiCBUq_DHp4h213-NjEicXRnQPdFmqUAWoWMjHEhC2smKEO-TbY0caa38QbLGZGhQ1pN-OTNAcsE0RT2aN0sKiKu7gxA'

const expectedPhotoUrl = 'https://lh3.googleusercontent.com/p/AF1QipNHhVhUfERYC7VRz9G0u85-XlL_o1cxNuGD9X-V=s1600-w250'

describe('Photo fetch', function () {
    afterEach(function () {
        process.env.GOOGLE_API_KEY = apiKey
    })

    it('should get photo for bull pub', function (done) {
        this.timeout(5000)
        fetchPhoto(bullPubPhotoId)
            .then(photoUrl => {
                expect(photoUrl).to.equal(expectedPhotoUrl)
                done()
            })
            .catch(err => done(err))
            .catch(err => done(err))
    })

    it('should fail when image not found', function (done) {
        fetchPhoto('CmRYAAAA49WLG2CnyDJvQuD8Qjsm')
            .then(photoUrl => done(new Error('Photo should not be found')))
            .catch(response => {
                expect(response.statusCode).to.equal(400)
                done()
            })
    })

    it('should fail when invalid API key provided', function (done) {
        process.env.GOOGLE_API_KEY = 'invalid'
        fetchPhoto(bullPubPhotoId)
            .then(photoUrl => done(new Error('Photo should not be found')))
            .catch(response => {
                expect(response.statusCode).to.equal(403)
                done()
            })
            .catch(err => done(err))
    })
})