const db = require('lowdb')()
const PHOTOS = 'photos'

const set = (id, value) => db.set([PHOTOS, id], value).write()

const find = id => db.get([PHOTOS, id]).value()

module.exports = {set, find}