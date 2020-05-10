import * as events from './events.js';
import vars from '../variables.js';

export default function start() {
  vars.keyboard.addEventListener('mousedown', (e) => events.mouseDownFunction(e));
  vars.keyboard.addEventListener('mouseup', (e) => events.mouseUpFunction(e));
  vars.body.addEventListener('click', () => vars.input.focus());
}
