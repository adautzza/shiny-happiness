// server.js

const http = require('http');
const postService = require('./services/postService');

async function handleRequest(request, response) {
  try {
    const posts = await postService.getPosts();
    const html = generatePostHTML(posts);

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(html);
    response.end();
  } catch (error) {
    console.error('Error:', error);
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.write('Internal Server Error');
    response.end();
  }
}

function generatePostHTML(posts) {
    let html = `
      <!DOCTYPE html>
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
      <body>
    `;
  
    posts.forEach((post) => {
      const card = `
        <div class="card">
          <div class="vf-card__title">${post.category}</div>
          <div class="vf-card__image">
            <img src="${post.image}" alt="Blog Post Image">
          </div>
          <div class="vf-card__content">
            <h3 class="vf-card__content-heading">${post.title}</h3>
            <p class="vf-card__content-subheading">${post.author} | ${post.date}</p>
            <p class="vf-card__content-body">${post.content}</p>
            <p class="vf-card__content-type">${post.type}</p>
          </div>
        </div>
      `;
      html += card;
    });
  
    html += `
      <script src="https://assets.ubuntu.com/v1/vanilla-framework-version-2.10.1.min.js"></script>
      </body>
      </html>
    `;
  
    return html;
  }
  
const server = http.createServer(handleRequest);
const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
