const express = require('express')
const router = express.Router()

const { catchErrors } = require('../handlers/errorHandlers')
const todoController = require('../controllers/todoController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.get('/', (req, res) => {
  res.render('index', { title: 'Todo Express' })
})

router.post('/todo/add', catchErrors(todoController.addTodo))

// 1. Validate the registration data
// 2. register the user
// 3. we need to log them in
router.post(
  '/register',
  userController.validateRegister,
  catchErrors(userController.register),
  authController.login
)

router.get('/loginSuccess', (req, res) => {
  res.send('You are now logged in!')
})
router.get('/loginFailure', (req, res) => {
  res.send('Failed Login!')
})

router.get('/logout', authController.logout)

router.post('/login', authController.login)

router.post('/account/forgot', catchErrors(authController.forgot))

module.exports = router
