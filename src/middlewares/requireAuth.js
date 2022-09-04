const { verify } = require('jsonwebtoken')

const getKey = require('../keys/getKey')
const User = require('../models/user')

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) return res.status(401).send({ errMsg: 'Not Authorized' })

  const { sub } = verify(token, getKey('public.key'))
  const user = await User.findById(sub)

  if (!user) return res.status(401).send({ errMsg: 'Not Authorized' })

  req.user = user.toJSON()

  next()
}
