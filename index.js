if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const app = require('./src/app')
const mongoose = require('mongoose')

mongoose
  .connect(`${process.env.MONGO_URI}`, {
    dbName: 'track-server'
  })
  .then(() => console.log('mongo connected'))
  .catch((e) => console.log('mongo connection error', e.message))

app.listen(process.env.PORT, () =>
  console.log(`track-server listening at port ${process.env.PORT}`)
)
