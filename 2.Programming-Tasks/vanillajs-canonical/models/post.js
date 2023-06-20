// create the model to represent a single Blog Post

class Post {
    constructor(id, date, title, link) {
      this.id = id;
      this.date = date;
      this.title = title;
      this.link = link;
    }
  }
  
  module.exports = Post;
  