import create from './create.js';

export default class CreateInfo {
  constructor(data) {
    this.data = data;
  }

  createCardsList() {
    const cards = [];
    this.data.Search.forEach((item) => {
      const title = create('div','name-block', create('a', 'name', item.Title, null, ['href', '#']));
      const image = create('div', 'image-block', create('img', 'image', null, null, ['src', item.Poster]));
      const year = create('div', 'year', item.Year);
      const rating = create('div', 'rating', [create('span', 'star'), '1337']);
      const card = create('div', 'swiper-slide', [title, image, year, rating]);
      cards.push(card);
    });
    return cards;
  }
}
