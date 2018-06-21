const slug = require('slugs')

exports.uniqueSlug = async function(next, field) {
  if (!this.isModified(field)) {
    next() // skip it
    return // stop this function from running
  }
  this.slug = slug(this[field])

  // find other fields that have a slug of field, field-1, field-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
  const fieldsWithSlug = await this.constructor.find({ slug: slugRegEx })
  if (fieldsWithSlug.length) {
    this.slug = `${this.slug}-${fieldsWithSlug.length + 1}`
  }

  next()
}
