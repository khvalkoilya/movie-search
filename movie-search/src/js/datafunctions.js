import create from './utils/create.js';
import CreateInfo from './utils/createInfo.js';
import createSwiper from './utils/swiper-module.js';
import vars from './variables.js';

const observer = new MutationObserver(() => {
  if (vars.next.getAttribute('aria-disabled') === 'true' && vars.accessUpdate) {
    vars.page += 1;
    getMovieData();
  }
});

observer.observe(vars.next, {
  attributes: true,
});

function checkRus() {
  const matches = vars.word.match(/[а-я\s]/gi);
  if (matches !== null && matches.length === vars.word.length) {
    return true;
  }
  return false;
}

async function getTranslation() {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200507T161021Z.e1df929ffbdcfb02.e69f728503d882be70c316af4862d16dab9795de&text=${vars.word}&lang=ru-en`;
  const res = await fetch(url);
  const data = await res.json();
  return data.text[0];
}

function changeModeForLoading(access, toggleType) {
    vars.accessUpdate = access;
    vars.loading.classList[toggleType]('none');
}


async function getMovieData() {
    changeModeForLoading(false, 'remove')
  try {
    vars.error.innerHTML = '';
    if (checkRus()) {
      vars.word = await getTranslation();
      reply(`Showing results for '${vars.word}'`, false);
    }
    const url = `https://www.omdbapi.com/?s=${vars.word}&page=${vars.page}&apikey=e1a5860`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === 'True') {
      if (vars.page === 1) {
        document.querySelector('.swiper-wrapper').innerHTML = '';
      }
      const newData = await prepareData(data);
      createCards(newData);
    } else if (data.Error === 'Too many results.') {
      reply(`A lot of matches for the '${vars.word}'`);
    } else if (vars.page === 1) {
      reply(`No results for '${vars.word}'`);
    }
  } catch (e) {
    reply(e.message);
  }
  changeModeForLoading(true, 'add')
}

function reply(text, flag = true) {
  if (flag) {
    vars.input.setAttribute('placeholder', 'Search');
  }
  const message = create('p', 'error-message__text', text);
  vars.error.append(message);
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
      item.Poster = vars.noPoster;
    }
    item.Rating = ratingsArray[index].imdbRating;
  });
  return data.Search;
}

async function createCards(data) {
  const cards = new CreateInfo(data);
  const cardsList = cards.createCardsList();
  if (vars.page === 1) {
    createSwiper();
  }
  vars.swiper.appendSlide(cardsList);
  vars.slides = document.querySelectorAll('.swiper-slide');
}

export default getMovieData;
