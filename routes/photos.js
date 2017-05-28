const express = require('express')
const router = express.Router()
const photos = require('../datastore/photos')

router.get('/:id', function(req, res) {
    const photo = photos.find(req.params.id)
    if (photo) {
        res.status(200).json(photo)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router