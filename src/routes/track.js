const router = require('express').Router()
const { checkSchema, body } = require('express-validator')
const bodyValidator = require('../middlewares/bodyValidator')
const requireAuth = require('../middlewares/requireAuth')
const Track = require('../models/track')

const validationSchema = {
  name: {
    isString: true,
    errorMessage: 'not look likes a name'
  },
  'locations.*.timestamp': {
    isNumeric: true
  },
  'locations.*.coords.latitude': {
    isNumeric: true
  },
  'locations.*.coords.longitude': {
    isNumeric: true
  },
  'locations.*.coords.altitude': {
    isNumeric: true
  },
  'locations.*.coords.accuracy': {
    isNumeric: true
  },
  'locations.*.coords.speed': {
    isNumeric: true
  },
  'locations.*.coords.heading': {
    isNumeric: true
  }
}

router.use(requireAuth)

router.get('/', async (req, res) => {
  console.log(req.user)
  const tracks = await Track.find({ userId: req.user.id })
  res.send(tracks)
})

router.post(
  '/',
  body('locations').isArray({ min: 1 }),
  checkSchema(validationSchema, ['body']),
  bodyValidator,
  async (req, res) => {
    const { name, locations } = req.body

    const track = new Track({ name, locations, userId: req.user.id })
    await track.save()
    res.send(track)
  }
)

module.exports = router
