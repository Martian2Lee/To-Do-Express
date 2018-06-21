const express = require('express')

// import all of our models
require('./../models/Todo')
require('./../models/User')

const { catchErrors } = require('../handlers/errorHandlers')
const { addTodo } = require('../controllers/todoController')
const {
  emailExists,
  register,
  login,
  logout,
  forgot
} = require('../controllers/userController')
const {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validationErrors
} = require('../controllers/validationController')

const router = express.Router()

const validateRegister = [
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validationErrors
]

const checkEmailBeforeLogin = [catchErrors(emailExists), login]

// todo
router.post('/todo/add', catchErrors(addTodo))

// register
router.post(
  '/register',
  validateRegister, // 1. Validate the registration data
  catchErrors(register), // 2. register the user
  checkEmailBeforeLogin // 3. we need to log them in
)

// login
router.post('/login', checkEmailBeforeLogin)
router.get('/login/success', (req, res) => res.send('Welcome!'))
router.get('/login/failure', (req, res) => res.send('Invalid password.'))

// logout
router.get('/logout', logout)

// reset password
router.post('/account/forgot', catchErrors(emailExists), catchErrors(forgot))

module.exports = router
