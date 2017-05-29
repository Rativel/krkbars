const https = require('https')
const querystring = require('querystring')

const googleUrl = 'https://maps.googleapis.com/maps/api/place/photo'

if (process.env.NODE_ENV === 'test') {
    module.exports = function fetchPhoto() {
        return Promise.reject('fetchPhoto is stubbed')
    }
} else {
    module.exports = function fetchPhoto(photoreference) {
        const params = querystring.stringify({photoreference, maxwidth: 250, key: process.env.GOOGLE_API_KEY})

        return new Promise((resolve, reject) =>
            https.get(googleUrl + '?' + params, response => {
                if (response.statusCode === 302) {
                    resolve(response.headers.location)
                } else {
                    const {statusCode, statusMessage} = response
                    reject({statusCode, statusMessage})
                }
            }).on('error', reject)
        )
    }
}


