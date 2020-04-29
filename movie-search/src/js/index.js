import '../assets/styles/style.css';
import Swiper from 'swiper';

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 2,
  spaceBetween: 30,
  //   loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


getMovieTitle('back');
async function getMovieTitle(word, page = 1) {
  const url = `https://www.omdbapi.com/?s=${word}&page=${page}&apikey=e1a5860`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.Search[0].Year);

  return data;
}
