import create from './create.js';

export default class CreateInfo {
  constructor(data) {
    this.data = data;
  }

  createCardsList() {
    const cards = [];
    this.data.forEach((item) => {
      const title = create('div', 'name-block', create('a', 'name', item.Title, null, ['href', `https://www.imdb.com/title/${item.imdbID}/`]));
      const image = create('div', 'image-block', create('img', 'image', null, null, ['src', item.Poster]));
      const year = create('div', 'year', item.Year);
      const rate = create('div', 'rating', [create('span', 'star'), item.Rating]);
      const card = create('div', 'swiper-slide', [title, image, year, rate]);
      cards.push(card);
    });
    return cards;
  }
}
