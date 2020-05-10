import create from '../utils/create.js';
import vars from '../variables.js';

export default function createBase() {
  vars.field = document.querySelector('.search-input');
  vars.keyboard = create('section', 'keyboard keyboard-hidden', null, document.querySelector('main'));
  vars.field.focus();
  vars.keyboard.setAttribute('onselectstart', 'return false');
}
