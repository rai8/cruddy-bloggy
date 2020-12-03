const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

//initialize the slug plugin
mongoose.plugin(slug)

//defining the schema
const blogSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  description: { type: String },
  timeCreated: { type: Date, default: () => Date.now() },
  img: { type: String, default: 'Placeholder.jpg' },
  slug: { type: String, slug: 'title', unique: true, slug_padding_size: 2 },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
