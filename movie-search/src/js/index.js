import '../assets/styles/style.css';
import create from './utils/create.js';
import CreateInfo from './utils/createInfo.js';
import createSwiper from './utils/swiper-module.js';
import vars from './variables.js';

getMovieData(vars.word);

const observer = new MutationObserver(() => {
  if (vars.next.getAttribute('aria-disabled') === 'true') {
    vars.page += 1;
    getMovieData(vars.word, vars.page);
  }
});

observer.observe(vars.next, {
  attributes: true,
});

async function getMovieData(word, page = 1) {
  vars.loading.classList.remove('none');
  try {
    document.querySelector('.error-message').innerHTML = '';
    const url = `https://www.omdbapi.com/?s=${word}&page=${page}&apikey=e1a5860`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === 'True') {
      if (page === 1) {
        document.querySelector('.swiper-wrapper').innerHTML = '';
      }
      const newData = await prepareData(data);
      createCards(newData);
    } else if (data.Error === 'Too many results.') {
      badRequest(word, 'A lot of matches for the ');
    } else {
      badRequest(word);
    }
  } catch (e) {
    badRequest(e, '');
  }
  vars.loading.classList.add('none');
}

function badRequest(word, text = 'No results for ') {
  vars.input.setAttribute('placeholder', 'Search');
  const message = create('p', 'error-message__text', `${text} '${word}'`);
  document.querySelector('.error-message').append(message);
}

async function getMovieRatingArray(data) {
  const requests = data.Search.map((item) => prepareRequests(item.imdbID));
  const resolvedPromises = await Promise.all(requests);
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
  });
  return data.Search;
}

function createCards(data) {
  const cards = new CreateInfo(data);
  const cardsList = cards.createCardsList();
  vars.slides = document.querySelectorAll('.swiper-slide');
  // vars.slides.forEach((item) => item.onload = function () {
  //   console.log('yeee');
  // });
  if (vars.page === 1) {
    createSwiper();
  }
  vars.swiper.appendSlide(cardsList);
}

document.querySelector('.search-submit').addEventListener('click', () => searchFunction());
document.querySelector('.clear-svg').addEventListener('click', () => {
  vars.input.value = '';
  vars.input.focus();
});

vars.input.addEventListener('keydown', (el) => {
  if (el.keyCode === 13) {
    searchFunction();
  }
});

function searchFunction() {
  const { value } = vars.input;
  vars.input.value = '';
  if (value.length !== 0) {
    vars.input.setAttribute('placeholder', value);
    vars.word = value;
    vars.page = 1;
    getMovieData(vars.word);
  }
}
