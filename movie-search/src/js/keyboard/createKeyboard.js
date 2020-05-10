import create from '../utils/create.js';
import objOfKeys from './layouts/buttons.js';
import vars from '../variables.js';

export default function keyFill(lang) {
  vars.keyboard.innerHTML = '';
  objOfKeys.forEach((item) => {
    const childs = [];
    const upLetter = create('p', 'upLetter');
    const centerLetter = create('p', 'centerLetter');
    const capitalisedLanguage = lang.charAt(0).toUpperCase() + lang.slice(1);
    if (item.view === 'double') {
      upLetter.innerHTML = item[`shift${capitalisedLanguage}Value`];
      centerLetter.innerHTML = item[`${lang}Value`];
    } else {
      centerLetter.innerHTML = item[`shift${capitalisedLanguage}Value`];
    }
    if (upLetter.innerHTML !== '') {
      childs.push(upLetter);
    }
    childs.push(centerLetter);
    const classes = `${item.size} ${item.code}`;
    const key = create('div', null, childs);
    key.className = classes;
    vars.keyboard.append(key);
  });
}
