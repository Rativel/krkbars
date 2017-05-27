const express = require('express');
const router = express.Router();
const bars = require('../datastore/bars')

router.get('/', function(req, res) {
    res.status(200).json(bars.all())
})

module.exports = router
