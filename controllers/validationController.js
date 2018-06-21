exports.validateEmail = (req, res, next) => {
  const { checkBody, sanitizeBody } = req

  checkBody('email', 'That Email is not valid!').isEmail()
  sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  })
  next()
}

exports.validatePassword = (req, res, next) => {
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty()
  next()
}

exports.validatePasswordConfirm = (req, res, next) => {
  const { checkBody, body } = req

  checkBody(
    'password-confirm',
    'Confirmed Password cannot be blank!'
  ).notEmpty()
  checkBody('password-confirm', 'Oops! Your passwords do not match').equals(
    body.password
  )
  next()
}

exports.validationErrors = (req, res, next) => {
  const { validationErrors, body } = req

  const errors = validationErrors()
  if (errors) {
    res.send({ errors, body })
    return // stop the fn from running
  }
  next() // there were no errors
}
