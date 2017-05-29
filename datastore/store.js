const db = require('lowdb')()
const BARS = 'bars'
const PHOTOS = 'photos'

const setBars = value => db.set(BARS, value).write()

const addBars = value => db.set(BARS, findAllBars().concat(value)).write()

const findAllBars = () => db.get(BARS).value() || []

const findBar = place_id => db.get(BARS).find({place_id}).value() || null

const setPhotoUrl = (id, value) => db.set([PHOTOS, id], (value)).write()

const findPhotoUrl = id => (db.get([PHOTOS, id]).value())

module.exports = {setBars, addBars, findAllBars, findBar, setPhotoUrl, findPhotoUrl}