const db = require('lowdb')()
const BARS = 'bars'

const set = value => db.set(BARS, value).write()

const all = () => db.get(BARS).value() || []

const find = place_id => db.get(BARS).find({place_id}).value() || null

module.exports = {set, all, find}