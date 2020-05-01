import '../assets/styles/style.css';
import create from './utils/create.js';
import CreateInfo from './utils/createInfo.js';
import createSwiper from './utils/swiper-module.js';


getMovieData('back');
async function getMovieData(word, page = 1) {
  const url = `https://www.omdbapi.com/?s=${word}&page=${page}&apikey=e1a5860`;
  const res = await fetch(url);
  const data = await res.json();
  if(data.Response === 'True') createCards(data);
  else console.log('gg')
}

function createCards(data) {
  console.log(data);
  const cards = new CreateInfo(data);
  const cardsList = cards.createCardsList();
  console.log(cardsList);
  cardsList.forEach((item) => document.querySelector('.swiper-wrapper').append(item));
  createSwiper();
}

