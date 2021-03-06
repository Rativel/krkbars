const db = require('lowdb')()
const BARS = 'bars'
const PHOTOS = 'photos'

const clear = () => db.setState({})

const setBars = value => db.set(BARS, value).write()

const addBars = value => db.set(BARS, findAllBars().concat(value)).write()

const findAllBars = () => db.get(BARS).value() || []

const findBar = place_id => db.get(BARS).find({place_id}).value() || null

const setPhotoUrl = (id, value) => {
    db.set([PHOTOS, id], (value)).write()
    db.get(BARS).find(['photo.photo_reference', id]).set('photo.url', value).write()
}

const findPhotoUrl = id => (db.get([PHOTOS, id]).value())

module.exports = {clear, setBars, addBars, findAllBars, findBar, setPhotoUrl, findPhotoUrl}