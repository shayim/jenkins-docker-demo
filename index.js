const mongoose = require('mongoose')
const app = require('./src/app')

mongoose
  .connect(`mongodb://root:example@mongo:27017/`, {
    dbName: 'track-server'
  })
  .then(() => console.log('mongo connected'))
  .catch((e) => console.log('mongo connection error', e.message))

app.listen(3000, () => console.log('track-server listening at port 3000'))
