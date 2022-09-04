const { Schema, model } = require('mongoose')
const { compare, hash } = require('bcryptjs')

const schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    toJSON: {
      transform: function (doc, ret, options) {
        ret.id = ret._id.toString()

        delete ret.password
        delete ret._id
        delete ret.__v
      }
    }
  }
)

schema.pre('save', async function (next) {
  const login = this
  if (login.isModified('password')) {
    login.password = await hash(login.password, 12)
  }
  next()
})

schema.methods.verifyPassword = async function (password) {
  return compare(password, this.password)
}

module.exports = model('Login', schema)
