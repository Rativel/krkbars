const express = require('express')
const router = express.Router()
const store = require('../datastore/store')

router.get('/', function(req, res) {
    res.status(200).json(store.findAllBars())
})

router.get('/:id', function(req, res) {
    const bar = store.findBar(req.params.id)
    if (bar) {
        res.status(200).json(bar)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
