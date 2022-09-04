const mongoose = require('mongoose')
const { sign } = require('jsonwebtoken')
const { body } = require('express-validator')

const getKey = require('../keys/getKey')
const User = require('../models/user')
const bodyValidator = require('../middlewares/bodyValidator')
const router = require('express').Router()

router.post(
  '/signup',
  body('email').isEmail(),
  body('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})/)
    .withMessage(
      'password shall include lowercase, uppercase, digital and special characters !@#$%^&*'
    ),
  bodyValidator,
  async (req, res) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    })
    await user.save()

    const token = sign({ sub: user._id }, getKey('private.key'), {
      algorithm: 'RS256',
      issuer: 'http://tracker-server',
      expiresIn: 60 * 60 * 12
    })

    res.json({ token })
  }
)

router.post(
  '/signIn',
  body('email').isEmail(),
  body('password').notEmpty(),
  bodyValidator,
  async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) return res.status(400).json({ errMsg: 'Login failed' })

    if (!(await user.verifyPassword(req.body.password)))
      return res.status(400).json({ errMsg: 'Login failed' })

    const token = sign({ sub: user._id }, getKey('private.key'), {
      algorithm: 'RS256',
      issuer: 'http://tracker-server',
      expiresIn: 60 * 60 * 12
    })

    res.json({ token })
  }
)

module.exports = router
