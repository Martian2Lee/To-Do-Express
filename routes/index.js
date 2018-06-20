const express = require('express')
const router = express.Router()

// import all of our models
require('../models/Todo')

const mongoose = require('mongoose')
const Todo = mongoose.model('Todo')

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Todo Express' })
})

router.get('/add', async (req, res, next) => {
  const { content, users } = req.query
  const todo = await new Todo({ content, users: users.split(',') }).save()
  res.send(todo)
})

module.exports = router
