// Main entry point for the application

const postService = require('./services/postService');

async function main() {
  try {
    const posts = await postService.getPosts();
    console.log('Posts:', posts);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();