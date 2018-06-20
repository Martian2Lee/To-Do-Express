const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const slug = require('slugs')

const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true
  },
  slug: String,
  users: [String]
})

todoSchema.pre('save', function(next) {
  if (!this.isModified('content')) {
    next() // skip it
    return // stop this function from running
  }
  this.slug = slug(this.content)
  next()
  // TODO make more resilient so slugs are unique
})

module.exports = mongoose.model('Todo', todoSchema)
