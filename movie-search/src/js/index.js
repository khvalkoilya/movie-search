import '../assets/styles/style.css';
import create from './utils/create.js';
import CreateInfo from './utils/createInfo.js';
import createSwiper from './utils/swiper-module.js';
import vars from './variables.js'


getMovieData('land');
async function getMovieData(word, page = 1) {
  vars.loading.classList.remove('none');
  const url = `https://www.omdbapi.com/?s=${word}&page=${page}&apikey=e1a5860`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === 'True') {
    const newData = await prepareData(data);
    createCards(newData);
    console.log(newData.length);
  } else console.log('gg');
  vars.loading.classList.add('none');
}

async function getMovieRatingArray(data) {
  const requests = data.Search.map((item) => prepareRequests(item.imdbID));
  const resolvedPromises = await Promise.all(requests);
  console.log(resolvedPromises);
  const toJsonReq = resolvedPromises.map((item) => item.json());
  const ratingsArray = await Promise.all(toJsonReq);
  return ratingsArray;
}

function prepareRequests(id) {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=e1a5860`;
  return fetch(url);
}

async function prepareData(data) {
  const ratingsArray = await getMovieRatingArray(data);
  data.Search.forEach((el, index) => {
    const item = el;
    if (item.Poster === 'N/A') {
      item.Poster = './assets/images/no_poster.jpg';
    }
    item.Rating = ratingsArray[index].imdbRating;
    console.log('in forEach');
  });
  return data.Search;
}

function createCards(data) {
  const cards = new CreateInfo(data);
  const cardsList = cards.createCardsList();
  cardsList.forEach((item) => document.querySelector('.swiper-wrapper').append(item));
  createSwiper();
}
