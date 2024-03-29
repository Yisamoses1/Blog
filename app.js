const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')




const app = express();

// connect to mongpdb
const dbURI = 'mongodb+srv://Netninja:solomon1234@tutorial.vyzvfiu.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(dbURI)

.then((result) => {app.listen(3000)})
.catch((err) => console.log(err))

app.set('view engine', 'ejs')  



app.use(express.static('public'))
//we can only get a request if we use this middleware 
// it aslo help to print out thr properties of the blog
app.use(express.urlencoded({ extended: true}));

app.use(morgan('dev'));


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
    res.render('index', {title: 'All Blogs', blogs: result})
  })
  .catch((err) => {
    console.log(err)
  })
})

app.post('/blogs', (req, res) => {
  //  a new instance of blog
  const blog = new Blog(req.body); 
  
  blog.save()
  .then(result => {
    res.redirect('/blogs')
  })

  .catch(err => {
    console.log(err)
  })


})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
  .then(result => {
    res.render('details', {blog: result, title: 'Blog Details'})
  })
  .catch(err => {
    console.log(err)
  })
})
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
  .then(result => {
    res.json({ redirect: '/blogs'})
  }) 
  .catch(err => {
    console.log(err)
  })
})


app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create a new Blog'})
});

app.use((req, res) => {
  res.status(404).render('404', {title: '404'})
});

