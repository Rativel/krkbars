const db = require('lowdb')()
const PHOTOS = 'photos'

// const encode = value => Buffer.from(value).toString('base64')
// const decode = value => Buffer.from(value, 'base64').toString()

const set = (id, value) => db.set([PHOTOS, id], (value)).write()

const find = id => (db.get([PHOTOS, id]).value())

module.exports = {set, find}