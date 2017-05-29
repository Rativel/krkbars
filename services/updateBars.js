const googleClient = require('@google/maps').createClient({key: process.env.GOOGLE_API_KEY, Promise})
const store = require('../datastore/store')

const location = '50.0619753,19.9370854' //KRAKOW MAIN SQUARE LOCATION

const delay2s = (f, args) => new Promise(resolve => setTimeout(() => resolve(f(args)), 2000))

const mapPlace = ({place_id, name, rating, vicinity, photos = []}) => ({place_id, name, rating, vicinity, photo: photos[0]})

module.exports = function updateBars() {
    store.clear()
    return googleClient.placesNearby({location, keyword: 'bars and pubs', radius: 2000})
        .asPromise()
        .then(handleData)
        .catch(console.log)
}

function handleData({status, json}) {
    console.log('Update status: ', json.status || status)
    store.addBars(json.results.map(mapPlace))
    if(json.next_page_token) {
        return delay2s(() => updateNextPage(json.next_page_token))
    }
}

function updateNextPage(pagetoken) {
    console.log('Request next page:', pagetoken.substr(0, 6))
    return googleClient.placesNearby({location, pagetoken})
        .asPromise()
        .then(handleData)
        .catch(console.log)
}
