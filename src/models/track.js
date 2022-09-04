const { Schema, model, Types } = require('mongoose')

const pointSchema = new Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    speed: Number,
    heading: Number
  }
})

const schema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  name: { type: String, default: '' },
  locations: [pointSchema]
})

module.exports = model('Track', schema)
