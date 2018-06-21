// helpers
const notEmpty = (req, field) => {
  // filed name change from 'my_filed' to 'MY filed'
  const filedName = (field.charAt(0).toUpperCase() + field.slice(1))
    .split('_')
    .join(' ')
  req.checkBody(field, `${filedName} cannot be blank!`).notEmpty()
}

const notEmptyNext = field => {
  return (req, res, next) => {
    notEmpty(req, field)
    next()
  }
}

const validationErrors = (req, res, next) => {
  const { validationErrors, body } = req

  const errors = validationErrors()
  if (errors) {
    res.send({ errors, body })
    return // stop the fn from running
  }
  next() // there were no errors
}

const errors = validation => [...validation, validationErrors]

// fields
const boardUsers = (req, res, next) => {
  notEmpty(req, 'users')
  req.checkBody('users.*', 'Some Email is not valid!').isEmail()
  next()
}

const email = (req, res, next) => {
  notEmpty(req, 'email')
  req.checkBody('email', 'That Email is not valid!').isEmail()
  next()
}

const passwordConfirm = (req, res, next) => {
  const { checkBody, body } = req

  notEmpty(req, 'password_confirm')
  checkBody('password_confirm', 'Oops! Your passwords do not match').equals(
    body.password
  )
  next()
}

// combinations
exports.registerValidate = errors([
  email,
  notEmptyNext('password'),
  passwordConfirm
])

exports.loginValidate = errors([email, notEmptyNext('password')])

exports.boardValidate = errors([notEmptyNext('title'), boardUsers])

exports.todoValidate = errors([
  notEmptyNext('content'),
  notEmptyNext('board_id')
])

exports.passwordsValidate = errors([notEmptyNext('password'), passwordConfirm])

exports.forgotValidate = errors([email])
