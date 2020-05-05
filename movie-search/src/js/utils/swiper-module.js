import Swiper from 'swiper';

export default function createSwiper() {
  const swiper = new Swiper('.swiper-container', {
    //   loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      20: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
    },
  });
}
