import vars from '../variables.js';
import searchFunction from '../input.js';

function enterOneSymbol(symbol, to = 0, from = 0, number = 1, firstStop = vars.cursor, secondStop = vars.cursor) {
  vars.field.value = vars.field.value.slice(0, firstStop + to) + symbol
    + vars.field.value.slice(secondStop + from, vars.field.value.length);
  vars.field.selectionEnd = vars.cursor + number;
}

function transitionToEntering(first, second) {
  if (vars.lang === 'ru') {
    enterOneSymbol(first);
  }
  if (vars.lang === 'eng') {
    enterOneSymbol(second);
  }
}

export function write(item) {
  if (item.view !== 'double') {
    if (vars.pressShift || vars.pressCaps) {
      transitionToEntering(item.shiftRuValue, item.shiftEngValue);
    } else {
      transitionToEntering(item.shiftRuValue.toLowerCase(), item.shiftEngValue.toLowerCase());
    }
  } else if (item.shiftRuValue === '' && vars.lang === 'ru') {
    if (vars.pressShift || vars.pressCaps) {
      enterOneSymbol(item.ruValue);
    } else enterOneSymbol(item.ruValue.toLowerCase());
  } else if (vars.pressShift) {
    transitionToEntering(item.shiftRuValue, item.shiftEngValue);
  } else {
    transitionToEntering(item.ruValue, item.engValue);
  }
}

export function enterSymbols(item) {
  window.event.preventDefault();
  if (vars.field.selectionStart === vars.field.selectionEnd) {
    switch (item.code) {
      case 'Enter':
        searchFunction();
        break;
      case 'Backspace': {
        if (vars.cursor !== 0) {
          enterOneSymbol('', -1, 0, -1);
        }
        break;
      }
      case 'Delete':
        enterOneSymbol('', 0, 1, 0);
        break;
      case 'Tab':
        enterOneSymbol('    ', 0, 0, 4);
        break;
      case 'ArrowLeft': {
        if (vars.cursor !== 0) {
          vars.field.selectionEnd = vars.cursor - 1;
        }
        break;
      }
      case 'ArrowRight':
        vars.field.selectionStart = vars.cursor + 1;
        break;
      case 'ArrowUp':
        vars.field.selectionEnd = 0;
        break;
      case 'ArrowDown':
        vars.field.selectionStart = vars.field.value.length;
        break;
      default:
        break;
    }
    if (item.type === 'write') {
      write(item);
    }
  } else if (item.code.match(/Backspace|Delete|Tab|Enter/) || item.type === 'write') {
    enterOneSymbol('', 0, 0, 0, vars.field.selectionStart, vars.field.selectionEnd);
    if (item.code !== 'Backspace' && item.code !== 'Delete') {
      enterSymbols(item);
    }
  }
}
