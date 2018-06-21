const mongoose = require('mongoose')

const Todo = mongoose.model('Todo')

exports.addTodo = async (req, res) => {
  const { content, users } = req.body

  const todo = await new Todo({
    content,
    users: users ? users.map(user => user.trim()) : null
  }).save()
  res.send(todo)
}
