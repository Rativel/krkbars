const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

const bars = require('./routes/bars')

if (process.env.NODE_ENV !== 'test') {
    const barsUpdater = require('./services/barsUpdater')
    barsUpdater().then(() => console.log('Bars have been updated'))
}

const app = express()

app.use(logger('dev'))
app.use('/api/bars', bodyParser.urlencoded({extended: false}), bars)

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.all('/*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')))

module.exports = app
