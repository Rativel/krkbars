const expect = require('chai').expect

const updateBars = require('./updateBars')
const store = require('../datastore/store')
const testBar = require('./testdata.json')

describe('Bars Updater', function () {
    before(function () {
        store.setPhotoUrl(testBar.photo.photo_reference, testBar.photo.url)
    })

    it('should not contain any data initially', function () {
        expect(store.findAllBars()).to.be.empty
    })

    it('should fetch data from google places api', function (done) {
        this.timeout(10000)
        updateBars()
            .then(() => {
                expect(store.findAllBars()).to.be.of.length(60)
                done()
            })
            .catch(err => done(err))
    })

    it('each bar should have properties like place_id, name, etc', function () {
        const all = store.findAllBars()
        expect(all).to.be.of.length(60)
        all.forEach(bar => expect(bar).to.have.all.keys('place_id', 'name', 'rating', 'vicinity', 'photo'))
    })

    it('all bars should be unique', function () {
        const all = store.findAllBars()
        expect(all).to.be.of.length(60)
        expect(new Set(all.map(bar => bar.place_id)).size).to.be.equal(all.length)
    })

    it('should clean photo urls when bars updated', function () {
        expect(store.findPhotoUrl(testBar.photo.photo_reference)).to.be.undefined
    })
})