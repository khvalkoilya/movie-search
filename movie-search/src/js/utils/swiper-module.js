import Swiper from 'swiper';
import vars from '../variables.js';

export default function createSwiper() {
  vars.swiper = new Swiper('.swiper-container', {
    grabCursor: true,
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true,
    // },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      20: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
    },
  });
}
