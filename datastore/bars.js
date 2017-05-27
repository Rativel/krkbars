const db = require('lowdb')()
const BARS = 'bars'

const set = value => db.set(BARS, value).write()

const all = () => db.get(BARS).value() || []

module.exports = {set, all}