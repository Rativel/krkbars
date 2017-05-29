const expect = require('chai').expect

const storeUpdater = require('./barsUpdater')
const store = require('../datastore/store')

describe('Bars Updater', function () {
    it('should not contain any data initially', function () {
        expect(store.findAllBars()).to.be.empty
    })

    it('should fetch data from google places api', function (done) {
        this.timeout(10000)
        storeUpdater()
            .then(() => {
                expect(store.findAllBars()).to.be.of.length(60)
                done()
            })
    })

    it('each bar should have properties like place_id, name, etc', function () {
        const all = store.findAllBars()
        expect(all).to.be.of.length(60)
        all.forEach(bar => expect(bar).to.have.all.keys('place_id', 'name', 'rating', 'vicinity', 'photo'))
    })

    it('all bars should be unique', function () {
        const all = store.findAllBars()
        expect(new Set(all.map(bar => bar.place_id)).size).to.be.equal(all.length)
    })
})