import vars from './variables.js';
import getMovieData from './datafunctions.js';

vars.submit.addEventListener('click', () => searchFunction());
vars.clear.addEventListener('click', () => {
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
    getMovieData();
  }
  showingKeyboard('add');
}

vars.keyboardIcon.addEventListener('click', ()=>showingKeyboard('toggle'))

function showingKeyboard(type) {
  vars.keyboard.classList[type]('keyboard-hidden');
}

export default searchFunction;