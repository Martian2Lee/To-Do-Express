const express = require('express')
const router = express.Router()

// import all of our models
require('../models/Todo')
require('../models/User')

const todoController = require('../controllers/todoController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Todo Express' })
})

router.get('/loginFailure', (req, res, next) => {
  res.send('Failed Login!')
})

router.get('/loginSuccess', (req, res, next) => {
  res.send('You are now logged in!')
})

router.get('/add', catchErrors(todoController.addTodo))

// 1. Validate the registration data
// 2. register the user
// 3. we need to log them in
router.post(
  '/register',
  userController.validateRegister,
  catchErrors(userController.register),
  authController.login
)

module.exports = router
