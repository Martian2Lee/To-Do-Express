const passport = require('passport')

exports.login = passport.authenticate('local', {
  failureRedirect: '/loginFailure',
  successRedirect: '/loginSuccess'
})

exports.logout = (req, res) => {
  req.logout()
  res.send('You are now logged out! 👋')
}
