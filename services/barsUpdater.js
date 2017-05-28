console.log('Google API Key:', process.env.GOOGLE_API_KEY)

const googleClient = require('@google/maps').createClient({key: process.env.GOOGLE_API_KEY, Promise})
const bars = require('../datastore/bars')

const KRAKOW_MAIN_SQUARE_LOCATION = '50.0619753,19.9370854'
const mapPlace = ({place_id, name, rating, vicinity, opening_hours}) =>
    ({place_id, name, rating, vicinity, opening_hours})

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
            bars.set(json.results.map(mapPlace))
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
            bars.set(bars.all().concat(json.results.map(mapPlace)))
            if(json.next_page_token) {
                return delay2s(() => updateNextPage(json.next_page_token))
            }
        })
        .catch(err => console.log)
}

const delay2s = (f, args) => new Promise(resolve => setTimeout(() => resolve(f(args)), 2000))
