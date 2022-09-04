const express = require('express')
require('express-async-errors')

const authRoute = require('./routes/auth')

const app = express()
app.use(express.json())

app.use('/auth', authRoute)
app.use('/tracks', require('./routes/track'))

app.use((error, req, res, next) => {
  if (error) {
    console.log(error.message)
    res.status(500).send({ errMsg: 'My bad, something went wrong.' })
  }
  next()
})

app.use((req, res) => {
  res.status(400).send({ errMsg: 'We are missing in the universe.' })
})

module.exports = app
