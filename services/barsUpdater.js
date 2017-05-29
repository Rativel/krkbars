const googleClient = require('@google/maps').createClient({key: process.env.GOOGLE_API_KEY, Promise})
const store = require('../datastore/store')

const KRAKOW_MAIN_SQUARE_LOCATION = '50.0619753,19.9370854'
const mapPlace = ({place_id, name, rating, vicinity, photos = []}) =>
    ({place_id, name, rating, vicinity, photo: photos[0]})

module.exports = function barsUpdater() {
    return updateBars()
}

function updateBars() {
    return googleClient.placesNearby({
        location: KRAKOW_MAIN_SQUARE_LOCATION,
        keyword: 'bars and pubs',
        radius: 2000
    }).asPromise()
        .then(({status, json}) => {
            console.log('Update status: ', json.status || status)
            store.setBars(json.results.map(mapPlace))
            if(json.next_page_token) {
                return delay2s(() => updateNextPage(json.next_page_token))
            }
        })
        .catch(err => console.log)
}

function updateNextPage(pagetoken) {
    console.log('Request next page:', pagetoken.substr(0, 6))

    return googleClient.placesNearby({location: KRAKOW_MAIN_SQUARE_LOCATION, pagetoken}).asPromise()
        .then(({status, json}) => {
            console.log('Update status: ', json.status || status)
            store.addBars(json.results.map(mapPlace))
            if(json.next_page_token) {
                return delay2s(() => updateNextPage(json.next_page_token))
            }
        })
        .catch(err => console.log)
}

const delay2s = (f, args) => new Promise(resolve => setTimeout(() => resolve(f(args)), 2000))
