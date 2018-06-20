const express = require('express')
const router = express.Router()

// import all of our models
require('../models/Todo')

const todoController = require('../controllers/todoController')
const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Todo Express' })
})

router.get('/add', catchErrors(todoController.addTodo))

module.exports = router
