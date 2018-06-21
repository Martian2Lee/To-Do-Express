const passport = require('passport')
const mongoose = require('mongoose')
const promisify = require('es6-promisify')
const crypto = require('crypto')

const User = mongoose.model('User')

exports.register = async (req, res, next) => {
  const { email, password } = req.body

  const user = new User({ email })
  const register = promisify(User.register, User)
  await register(user, password)
  next()
}

exports.emailExists = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.send('No account with that email exists.')
  }
  req.user = user
  next()
}

exports.login = passport.authenticate('local', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failure'
})

exports.logout = (req, res) => {
  req.logout()
  res.send('You are now logged out! 👋')
}

exports.forgot = async (req, res) => {
  const { user, headers } = req

  // 1. Set reset tokens and expiry on their account
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  user.resetPasswordExpires = Date.now() + 3600000 // 1 hour from now
  await user.save()
  // 2. Send them an email with the token
  const resetURL = `http://${headers.host}/account/reset/${
    user.resetPasswordToken
  }`
  res.send(`You have been emailed a password reset link. ${resetURL}`)
}
