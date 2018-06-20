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
    res.send({ errors, body: req.body })
    return // stop the fn from running
  }
  res.send({ errors: null, body: req.body })
  next() // there were no errors!
}
