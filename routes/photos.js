const express = require('express')
const router = express.Router()
const store = require('../datastore/store')
const fetchPhoto = require('../services/fetchPhoto')

router.get('/:id', function(req, res) {
    const id = req.params.id
    const photoUrl = store.findPhotoUrl(id)
    if (photoUrl) {
        res.redirect(photoUrl)
    } else {
        fetchPhoto(id)
            .then(location => {
                store.setPhotoUrl(id, location)
                res.redirect(location)
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(404)
            })
    }
})

module.exports = router
