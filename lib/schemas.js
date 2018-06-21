const validator = require('validator')

const string = {
  type: String,
  trim: true
}

const email = {
  ...string,
  lowercase: true,
  validate: [validator.isEmail, 'Invalid Email Address']
}

exports.requiredString = key => ({
  ...string,
  required: `Please enter ${key}`
})

exports.slugSchema = String

exports.email = email

exports.boardUsers = {
  type: [email],
  required: 'You must supply users!'
}

exports.userEmail = {
  ...email,
  unique: true,
  required: 'Please Supply an email address'
}

exports.resetPasswordToken = String

exports.resetPasswordExpires = Date
