const passport = require('passport')
const mongoose = require('mongoose')
const promisify = require('es6-promisify')
const crypto = require('crypto')

const { sendEmail } = require('../handlers/mail')

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
  await sendEmail({
    user,
    subject: 'Password Reset',
    text: resetURL
  })
  res.send('You have been emailed a password reset link.')
}

exports.update = async (req, res) => {
  const { params, body, login } = req

  const user = await User.findOne({
    resetPasswordToken: params.token,
    resetPasswordExpires: { $gt: Date.now() }
  })

  if (!user) {
    return res.send('Password reset is invalid or has expired')
  }

  const setPassword = promisify(user.setPassword, user)
  await setPassword(body.password)
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  const updatedUser = await user.save()
  await login(updatedUser)
  res.send('💃 Nice! Your password has been reset! You are now logged in!')
}
