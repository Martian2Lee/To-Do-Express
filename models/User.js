const mongoose = require('mongoose')
const mongodbErrorHandler = require('mongoose-mongodb-errors')
const passportLocalMongoose = require('passport-local-mongoose')

const {
  userEmail,
  resetPasswordToken,
  resetPasswordExpires
} = require('../lib/schemas')

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const userSchema = new Schema({
  email: userEmail,
  resetPasswordToken,
  resetPasswordExpires
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
userSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('User', userSchema)
