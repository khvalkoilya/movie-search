import objOfKeys from './layouts/buttons.js';
import * as writing from './writing.js';
import keyFill from './createKeyboard.js';
import vars from '../variables.js';
import * as languages from './language.js';


function toggleButtonClickClass(elem, parent, toggleType) {
  if (elem.tagName === 'DIV') {
    elem.classList[toggleType]('buttonClick');
  } else if (parent.tagName === 'DIV') {
    parent.classList[toggleType]('buttonClick');
  }
}

export function mouseDownFunction(e) {
  vars.cursor = vars.field.selectionStart;
  const parent = e.target.parentElement;
  const elem = e.target;
  toggleButtonClickClass(elem, parent, 'add');
  objOfKeys.forEach((item) => {
    if (elem.classList.contains(item.code) || parent.classList.contains(item.code)) {
      if (elem.className.match(/ShiftLeft|ShiftRight/) || parent.className.match(/ShiftLeft|ShiftRight/)) {
        vars.pressShift = true;
      }
      writing.enterSymbols(item);
      window.event.preventDefault();
    }
  });
}

export function mouseUpFunction(e) {
  const parent = e.target.parentElement;
  const elem = e.target;
  if (parent.classList.contains('buttonClick') || elem.classList.contains('buttonClick')) {
    if (elem.classList.contains('CapsLock') || elem.innerHTML === 'CapsLock') {
      if (vars.pressCaps) {
        toggleButtonClickClass(elem, parent, 'remove');
      }
      vars.pressCaps = (!vars.pressCaps);
    } else {
      toggleButtonClickClass(elem, parent, 'remove');
      if (elem.className.match(/ShiftLeft|ShiftRight/) || parent.className.match(/ShiftLeft|ShiftRight/)) {
        vars.pressShift = false;
      }
      if (elem.classList.contains('language') || parent.classList.contains('language')) {
        vars.field.focus();
        vars.lang === 'ru' ? vars.lang = 'eng' : vars.lang = 'ru';
        languages.set('lang', vars.lang);
        keyFill(vars.lang);
      }
    }
  } else {
    document.querySelectorAll('div').forEach((key) => key.classList.remove('buttonClick'));
    vars.field.focus();
  }
}
