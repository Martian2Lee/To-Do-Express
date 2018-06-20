const passport = require('passport')

exports.login = passport.authenticate('local', {
  failureRedirect: '/loginFailure',
  successRedirect: '/loginSuccess'
})
