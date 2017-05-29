const express = require('express')
const router = express.Router()
const photos = require('../datastore/photos')
const fetchPhoto = require('../services/fetchPhoto')

router.get('/:id', function(req, res) {
    const id = req.params.id
    const photoUrl = photos.find(id)
    if (photoUrl) {
        res.redirect(photoUrl)
    } else {
        fetchPhoto(id)
            .then(location => {
                photos.set(id, location)
                res.redirect(location)
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(404)
            })
    }
})

module.exports = router
