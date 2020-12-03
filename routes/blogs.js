const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog')

router.get('/new', (req, res) => {
  res.render('new')
})

//getting a single post with its id
router.get('/:id', (req, res) => {
  const requestedId = req.params.id
  Blog.findOne({ _id: requestedId }, (err, blog) => {
    //console.log(blog)
    if (err) {
      console.log(err)
    } else {
      res.render('show', { blog: blog })
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
  blog
    .save()
    .then(res.redirect(`blogs/${blog.id}`))
    .catch(err => {
      if (err) throw err
    })
})
module.exports = router
