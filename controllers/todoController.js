const mongoose = require('mongoose')

const Todo = mongoose.model('Todo')
const Board = mongoose.model('Board')

exports.createTodo = async (req, res) => {
  const board = await Board.findById(req.body.board_id, err => {
    if (err) {
      return res.send('No board with that id exists.')
    }
  })
  if (!board) {
    return res.send('No board with that id exists.')
  }
  const todo = await new Todo({ ...req.body, board: board.title }).save()
  res.send(todo)
}
