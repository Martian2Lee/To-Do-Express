const mongoose = require('mongoose')

const { requiredString, slugSchema, boardUsers } = require('../lib/schemas')
const { uniqueSlug } = require('../lib/slug')

mongoose.Promise = global.Promise

const boardSchema = new mongoose.Schema({
  title: requiredString('title'),
  slug: slugSchema,
  users: boardUsers
})

boardSchema.pre('save', function(next) {
  uniqueSlug.bind(this)(next, 'title')
})

module.exports = mongoose.model('Board', boardSchema)
