const express = require('express')
const multer = require('multer') //handle image submission
const router = express.Router()
const Blog = require('../models/Blog')

//defining sorage for the images
const storage = multer.diskStorage({
  //destination for files
  destination: function (req, file, callback) {
    callback(null, './public/uploads/images')
  },
  //by default multer strips back the extension
  //to bring bakc the extension
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname)
  },
})

//defining the upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
})

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
//the image is that passed in index.ejs name property
router.post('/', upload.single('image'), async (req, res) => {
  let blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    img: req.file.filename,
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
    res.redirect(`/blogs/edit/${blog.id}`, { blog: blog })
  }
})

//handle deleeting of blog
router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router
