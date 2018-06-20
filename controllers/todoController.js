const mongoose = require('mongoose')
const Todo = mongoose.model('Todo')

exports.addTodo = async (req, res, next) => {
  const { content, users } = req.query
  const todo = await new Todo({
    content,
    users: users && users.split(',')
  }).save()
  res.send(todo)
}
