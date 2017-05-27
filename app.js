const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

const index = require('./routes/index')
const bars = require('./routes/bars')

if (process.env.NODE_ENV !== 'test') {
    const barsUpdater = require('./services/barsUpdater')
    barsUpdater().then(() => console.log('Bars have been updated'))
}

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/bars', bars)
app.use('/', index)

module.exports = app
