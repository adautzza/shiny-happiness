// index.js

const postService = require('./services/postService');

async function main() {
  try {
    const posts = await postService.getPosts();
    console.log('Posts:', posts);
    const html = generatePostHTML(posts); // Call a function to generate the HTML for the posts
    console.log('Generated HTML:', html);
  } catch (error) {
    console.error('Error:', error);
  }
}

function generatePostHTML(posts) {
  let html = '';

  posts.forEach((post) => {
    const card = `
      <div class="card">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      </div>
    `;
    html += card;
  });

  return html;
}

main();
