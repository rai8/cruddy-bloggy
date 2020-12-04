require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOveride = require('method-override') //this will handle editing or updating of our content blog
const PORT = process.env.PORT || 3000
const blogRouter = require('./routes/blogs')
const Blog = require('./models/Blog')

//connecting to database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('-----Database is successfulyy connected'))
  .catch(err => {
    if (err) throw err
  })

//setting the view engine
app.set('view engine', 'ejs')
//setting up middlewares
app.use(methodOveride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/blogs', blogRouter)

//root route
app.get('/', async (req, res) => {
  await Blog.find({}, null, { sort: '-timeCreated' }, function (err, blogs) {
    if (err) throw err
    res.render('index', { blogs: blogs })
  })
})

//listening to server
app.listen(PORT, () => console.log(`------Server is up and running------`))
