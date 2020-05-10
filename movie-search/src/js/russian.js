import vars from './variables.js';

function checkRus() {
    const matches = vars.word.match(/[а-я\s]/gi);
    if (matches !== null && matches.length === vars.word.length) {
        return true;
    }
    return false;
}
  
async function getTranslation() {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200507T161021Z.e1df929ffbdcfb02.e69f728503d882be70c316af4862d16dab9795de&text=${vars.word}&lang=ru-en`;
    const res = await fetch(url);
    const data = await res.json();
    return data.text[0];
}

export {checkRus, getTranslation};