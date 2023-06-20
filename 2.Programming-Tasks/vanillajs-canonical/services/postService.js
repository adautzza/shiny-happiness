const wordpressApi = require('../api/wordpress');
const Post = require('../models/post');

async function getPosts() {
  try {
    const postsData = await wordpressApi.getPosts();
    const posts = postsData.map(mapPostDataToModel);
    return posts;
  } catch (error) {
    console.error('Error occurred while fetching posts:', error);
    return [];
  }
}

function mapPostDataToModel(postData) {
  const { id, date, title, link, featured_media, _embedded } = postData;
  const formattedDate = formatDate(date);
  const author = _embedded && _embedded.author && _embedded.author[0] ? _embedded.author[0].name : 'Unknown author';
  const category = _embedded && _embedded['wp:term'] && _embedded['wp:term'][2] && _embedded['wp:term'][2][0] ? _embedded['wp:term'][2][0].name : 'Uncategorized';
  const type = _embedded && _embedded['wp:term'] && _embedded['wp:term'][0] && _embedded['wp:term'][0][0] ? _embedded['wp:term'][0][0].name : 'Uncategorized';

  return new Post(id, formattedDate, title && title.rendered ? title.rendered : 'Untitled', link, featured_media, author, category, type);
}

function formatDate(dateString) {
  const dateObject = new Date(dateString);
  const day = dateObject.getDate();
  const month = dateObject.toLocaleString('default', { month: 'long' });
  const year = dateObject.getFullYear();
  return `${day} ${month} ${year}`;
}


getPosts();

module.exports = {
  getPosts,
};
