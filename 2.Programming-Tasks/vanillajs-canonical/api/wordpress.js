// get data from wordpress api


async function getPosts() {
  const url = 'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

module.exports = {
  getPosts,
};
