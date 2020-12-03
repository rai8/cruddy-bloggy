const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog')

router.get('/new', (req, res) => {
  res.render('new')
})
//getting a single post with its id

router.get('/:slug', (req, res) => {
  Blog.findOne({ slug: req.params.slug }, (err, blog) => {
    if (!err) {
      res.render('show', { blog: blog })
    } else {
      console.log(err)
    }
  })
})

//handle posting of blogs
router.post('/', (req, res) => {
  let blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
  })
  blog.save(err => {
    if (!err) {
      res.redirect(`blogs/${blog.slug}`)
    } else {
      console.log(err)
    }
  })
})

module.exports = router
