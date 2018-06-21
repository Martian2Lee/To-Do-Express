const mongoose = require('mongoose')
const slug = require('slugs')

mongoose.Promise = global.Promise

const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: 'Please enter content!'
  },
  slug: String,
  users: {
    type: [String],
    required: 'You must supply users!'
  }
})

todoSchema.pre('save', async function(next) {
  if (!this.isModified('content')) {
    next() // skip it
    return // stop this function from running
  }
  this.slug = slug(this.content)

  // find other todos that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
  const todosWithSlug = await this.constructor.find({ slug: slugRegEx })
  if (todosWithSlug.length) {
    this.slug = `${this.slug}-${todosWithSlug.length + 1}`
  }
  next()
})

module.exports = mongoose.model('Todo', todoSchema)
