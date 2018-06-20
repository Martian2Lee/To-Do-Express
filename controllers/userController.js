const mongoose = require('mongoose')
const User = mongoose.model('User')
const promisify = require('es6-promisify')

exports.validateRegister = (req, res, next) => {
  req.checkBody('email', 'That Email is not valid!').isEmail()
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  })
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty()

  const errors = req.validationErrors()
  if (errors) {
    res.send({ validation: errors, body: req.body })
    return // stop the fn from running
  }
  next() // there were no errors!
}

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email })
  const register = promisify(User.register, User)
  await register(user, req.body.password)
  res.send('registered!')
  // next(); // pass to authController.login
}
