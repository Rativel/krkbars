const express = require('express')
const router = express.Router()
const bars = require('../datastore/bars')

router.get('/', function(req, res) {
    res.status(200).json(bars.all())
})

router.get('/:id', function(req, res) {
    const bar = bars.find(req.params.id)
    if (bar) {
        res.status(200).json(bar)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
