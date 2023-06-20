// create the model to represent a single Blog Post

class Post {
    constructor(id, date, title, link, featured_media, author_name, category, type) {
      this.id = id;
      this.date = date;
      this.title = title;
      this.link = link;
      this.featured_media = featured_media;
      this.author_name = author_name;
      this.category = category;
      this.type = type;
    }
  }
  
  module.exports = Post;
  