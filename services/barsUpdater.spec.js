const expect = require('chai').expect

const storeUpdater = require('./barsUpdater')
const bars = require('../datastore/bars')

describe('Bars Updater', function () {
    it('should not contain any data initially', function () {
        expect(bars.all()).to.be.empty
    })

    it('should fetch data from google places api', function (done) {
        this.timeout(10000)
        storeUpdater()
            .then(() => {
                expect(bars.all()).to.be.of.length(60)
                done()
            })
    })

    it('each bar should have properties like place_id, name, etc', function () {
        const all = bars.all()
        expect(all).to.be.of.length(60)
        all.forEach(bar => expect(bar).to.have.all.keys('place_id', 'name', 'rating', 'vicinity', 'photo'))
    })

    it('all bars should be unique', function () {
        const all = bars.all()
        expect(new Set(all.map(bar => bar.place_id)).size).to.be.equal(all.length)
    })
})