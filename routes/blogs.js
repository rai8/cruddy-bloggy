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
      res.redirect('/')
    }
  })
})

//handle posting of blogs
router.post('/', async (req, res) => {
  let blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
  })
  await blog.save(err => {
    console.log(blog)
    if (!err) {
      res.redirect(`blogs/${blog.slug}`)
    } else {
      console.log(err)
    }
  })
})

//handling updating and editing of content
router.get('/edit/:id', async (req, res) => {
  await Blog.findOne({ _id: req.params.id }, (err, blog) => {
    if (!err) {
      res.render('edit', { blog: blog })
    } else {
      res.redirect('/')
    }
  })
})

//route to handle update posts
router.put('/:id', async (req, res) => {
  req.blog = await Blog.findById(req.params.id)
  let blog = req.blog
  blog.title = req.body.title
  blog.author = req.body.author
  blog.description = req.body.description

  try {
    blog = await blog.save()
    //redirect to the view route
    res.redirect(`/blogs/${blog.slug}`)
  } catch (error) {
    console.log(error)
    res.redirect(`/seblogs/edit/${blog.id}`, { blog: blog })
  }
})

module.exports = router
