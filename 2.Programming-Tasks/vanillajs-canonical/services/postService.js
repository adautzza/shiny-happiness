// Map the data from the API to the Post model

const wordpressApi = require('../api/wordpress');
const Post = require('../models/post');

async function getPosts() {
  const postsData = await wordpressApi.getPosts();
  const posts = postsData.map(mapPostDataToModel);
  return posts;
}

function mapPostDataToModel(postData) {
  const { id, date, title, content, link } = postData;
  return new Post(id, date, title.rendered, content.rendered, link);
}

module.exports = {
  getPosts,
};
