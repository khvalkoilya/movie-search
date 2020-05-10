import createBase from './preparation.js';
import vars from '../variables.js';
import keyFill from './createKeyboard.js';
import start from './startOfEvents.js';

createBase();
keyFill(vars.lang);
start();
