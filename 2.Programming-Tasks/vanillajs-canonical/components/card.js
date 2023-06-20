// the card component is responsible for rendering a single card

class Card {
    constructor(post) {
      this.post = post;
    }
  
    render() {
      const { category, picture, title, author, date, type } = this.post;
  
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
  
      const categoryElement = document.createElement('div');
      categoryElement.classList.add('card-category');
      categoryElement.textContent = category;
  
      const imageElement = document.createElement('img');
      imageElement.classList.add('card-image');
      imageElement.src = picture;
  
      const titleElement = document.createElement('h2');
      titleElement.classList.add('card-title');
      titleElement.textContent = title;
  
      const authorElement = document.createElement('p');
      authorElement.classList.add('card-author');
      authorElement.textContent = `By ${author} on ${date}`;
  
      const typeElement = document.createElement('p');
      typeElement.classList.add('card-type');
      typeElement.textContent = type;
  
      cardElement.appendChild(categoryElement);
      cardElement.appendChild(imageElement);
      cardElement.appendChild(titleElement);
      cardElement.appendChild(authorElement);
      cardElement.appendChild(typeElement);
  
      return cardElement;
    }
  }
  
  export default Card;
  