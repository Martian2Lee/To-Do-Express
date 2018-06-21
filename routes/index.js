const express = require('express')

// import all of our models
require('./../models/Board')
require('./../models/Todo')
require('./../models/User')

const { catchErrors } = require('../handlers/errorHandlers')
const { createBoard } = require('../controllers/boardController')
const { createTodo } = require('../controllers/todoController')
const {
  emailShouldNotExist,
  register,
  emailShouldExist,
  login,
  logout,
  forgot,
  update,
  isLoggedIn
} = require('../controllers/userController')
const {
  registerValidate,
  todoValidate,
  boardValidate,
  forgotValidate,
  loginValidate,
  passwordsValidate
} = require('../controllers/validationController')

const router = express.Router()

const loginFlow = [loginValidate, catchErrors(emailShouldExist), login]

// register
router.post(
  '/register',
  registerValidate,
  catchErrors(emailShouldNotExist),
  catchErrors(register),
  loginFlow
)

// board
router.post(
  '/board/create',
  isLoggedIn,
  boardValidate,
  catchErrors(createBoard)
)

// todo
router.post('/todo/create', isLoggedIn, todoValidate, catchErrors(createTodo))

// logout
router.get('/logout', logout)

// login
router.post('/login', loginFlow)
router.get('/login/success', (req, res) => res.send('Welcome!'))
router.get('/login/failure', (req, res) => res.send('Invalid password.')) // check email exists in the previous middleware

// reset password
router.post(
  '/account/forgot',
  forgotValidate,
  catchErrors(emailShouldExist),
  catchErrors(forgot)
)
router.post('/account/reset/:token', passwordsValidate, catchErrors(update))

module.exports = router
