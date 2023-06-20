const express = require('express');
const postService = require('./services/postService');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.render('index', { posts });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
