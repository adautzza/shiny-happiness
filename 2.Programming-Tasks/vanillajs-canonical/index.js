const express = require('express');
const postService = require('./services/postService');

const app = express();
const port = 3000; // You can change the port number if desired

app.get('/', async (req, res) => {
  try {
    const posts = await postService.getPosts();
    const html = generatePostHTML(posts);
    res.send(html);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

function generatePostHTML(posts) {
  let html = `<!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="https://assets.ubuntu.com/v1/vanilla-framework-version-2.10.1.min.css">
      <style>
        .card {
          margin: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 300px;
        }
      </style>
    </head>
    <body>`;

  posts.forEach((post) => {
    const card = `
      <div class="card">
        <div class="vf-card__title">${post.category}</div>
        <div class="vf-card__image">
          <img src="${post.featured_media}" alt="Blog Post Image">
        </div>
        <div class="vf-card__content">
          <h3 class="vf-card__content-heading">${post.title}</h3>
          <p class="vf-card__content-subheading">By ${post.author_name} on ${post.date}</p>
          <p class="vf-card__content-type">${post.type}</p>
        </div>
      </div>
    `;
    html += card;
  });

  html += `
    <script src="https://assets.ubuntu.com/v1/vanilla-framework-version-2.10.1.min.js"></script>
    </body>
    </html>`;

  return html;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
