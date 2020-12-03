require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000
const blogRouter = require('./routes/blogs')

//connecting to database
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('-----Database is successfulyy connected'))
  .catch(err => {
    if (err) throw err
  })

//setting the view engine
app.set('view engine', 'ejs')
//setting up middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/blogs', blogRouter)

//root route
app.get('/', (req, res) => {
  const blogs = [
    {
      title: 'The information we do not need',
      snippet:
        'You,ve probably had of Lorem ipsum- it is the most used dummy text out there. People use it because it has a fairly',
      author: 'Somtea codes',
      createdAt: new Date(),
      img: 'placeholder.jpg',
    },
    {
      title: 'The information we do not need2',
      snippet:
        'You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly',
      author: 'Somtea Codes',
      createdAt: new Date(),
      img: 'placeholder.jpg',
    },
    {
      title: 'The information we do not need3',
      snippet:
        'You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly',
      author: 'Somtea Codes',
      createdAt: new Date(),
      img: 'placeholder.jpg',
    },
  ]
  res.render('index', { blogs: blogs })
})

//listening to server
app.listen(PORT, () => console.log(`------Server is up and running------`))
