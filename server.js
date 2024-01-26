const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views');

// Dati del blog (esempio)
const posts = [
  { id: 1, title: 'casa', content: 'Contenuto del primo post.Contenuto del primo post. ' },
  { id: 2, title: 'macchina', content: 'Contenuto del secondo post.Contenuto del secondo post.' },
  // Aggiungi altri post se necessario...
];

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  res.render('post', { post });
});

app.get('/admin', (req, res) => {
  res.render('admin',{ posts });
});

app.post('/admin/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    content
  };
  posts.push(newPost);
  res.redirect('/');
});


app.get('/admin/new', (req, res) => {
  res.render('add-post');
});

app.get('/admin/delete/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
  }
  res.redirect('/admin');
});





app.listen(3000, () => {
  console.log('Server avviato su http://localhost:3000');
});