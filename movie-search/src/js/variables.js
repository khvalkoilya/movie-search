import * as languages from './keyboard/language.js';

export default {
  body: document.querySelector('body'),
  loading: document.querySelector('.loading'),
  input: document.querySelector('.search-input'),
  slides: '',
  next: document.querySelector('.swiper-button-next'),
  page: 1,
  word: 'land',
  swiper: '',
  accessUpdate: true,
  error: document.querySelector('.error-message'),
  noPoster: './assets/images/no_poster.jpg',
  clear: document.querySelector('.clear-svg'),
  submit: document.querySelector('.search-submit'),
  keyboardIcon: document.querySelector('.keyboard-svg'),
  keyboard: '',
  field: '',
  changeLanguage: [false, false],
  pressShift: false,
  pressCaps: false,
  cursor: 0,
  lang: languages.get('lang', 'ru'),
};
