const mongoose = require('mongoose')

const { requiredString, slugSchema } = require('../lib/schemas')
const { uniqueSlug } = require('../lib/slug')

mongoose.Promise = global.Promise

const todoSchema = new mongoose.Schema({
  content: requiredString('content'),
  slug: slugSchema,
  board_id: requiredString('board_id'),
  board: requiredString('board')
})

todoSchema.pre('save', function(next) {
  uniqueSlug.bind(this)(next, 'content')
})

module.exports = mongoose.model('Todo', todoSchema)
