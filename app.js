const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')




const app = express();

// connect to mongpdb
const dbURI = 'mongodb+srv://Netninja:solomon123@tutorial.vyzvfiu.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(dbURI)

.then((result) => console.log(app.listen(3000)))
.catch((err) => console.log(err))

app.set('view engine', 'ejs')  



app.use(express.static('public'))
// the public used there is the folder of what i want to make public

app.use(morgan('dev'));

/* app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title : 'new blog2',
    snippet : 'about my new blog',
    body : 'more about my new blog'
  });

  blog.save()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err)
  });
})

app.get('/all-blogs', (eeq, res) => {
  Blog.find()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err)
  })
})

app.get('/single-blog', (req,res) => {
  Blog.findById('65a0fb304dce04b81dbd8f9b')
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err)
  })
}) */


app.get('/', (req, res) => {
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', {title: 'About'})
});

//blog route
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1})
  .then((result) => {
    res.render('index', {title: 'All Blogs', blogs:result})
  })
  .catch((err) => {
    console.log(err)
  })
})

app.get('blogs/create', (req, res) => {
  res.render('create', {title: 'ceate a new Blog'})
});

app.use((req, res) => {
  res.status(404).render('404', {title: '404'})
})