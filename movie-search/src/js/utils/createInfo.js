import create from './create.js';

export default class CreateInfo {
  constructor(data) {
    this.data = data;
    // this.rating = rating;
  }

  createCardsList() {
    const cards = [];
    this.data.forEach((item) => {
      console.log('in class');
      console.log(item);
      const title = create('div', 'name-block', create('a', 'name', item.Title, null, ['href', `https://www.imdb.com/title/${item.imdbID}/`]));
      const image = create('div', 'image-block', create('img', 'image', null, null, ['src', item.Poster])); // data.Poster
      const year = create('div', 'year', item.Year);
      const rate = create('div', 'rating', [create('span', 'star'), item.Rating]);
      const card = create('div', 'swiper-slide', [title, image, year, rate]);
      cards.push(card);
    });
    return cards;
  }

  createCardForList() {
    const title = create('div', 'name-block', create('a', 'name', this.data.Title, null, ['href', '#']));
    const image = create('div', 'image-block', create('img', 'image', null, null, ['src', this.data.Poster])); // data.Poster
    const year = create('div', 'year', this.data.Year);
    const rate = create('div', 'rating', [create('span', 'star'), this.data.rating]);
    const card = create('div', 'swiper-slide', [title, image, year, rate]);
    document.querySelector('.swiper-wrapper').append(card);
  }
}
