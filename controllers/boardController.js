const mongoose = require('mongoose')
const _ = require('lodash')

const Board = mongoose.model('Board')

exports.createBoard = async (req, res) => {
  let board = new Board(req.body)
  board.users = _.uniq(board.users) // remove duplicate users after they are normalized by schema
  await board.save()
  res.send(board)
}
