const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

const index = require('./routes/index')
const bars = require('./routes/bars')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', index)
app.use('/bars', bars)

module.exports = app
