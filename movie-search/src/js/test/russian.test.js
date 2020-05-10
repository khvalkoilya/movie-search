import {checkRus, getTranslation} from '../russian.js'

describe('check russian words', () => {
    it('should return defined', ()=>{
        expect(checkRus()).toBeDefined();
    });
    it('should return false', ()=>{
        expect(checkRus('frgr3акп')).toBeFalsy();
    });
});


// argument for getTranslation is variable 'word' in variables.js
describe('check translation of russian words', () => {
    it('should have length', () => {
        getTranslation().then(word => expect(word.length).toBeGreaterThan(0));
    });
    it('should should not have rus symbols', () => {
        getTranslation().then(word => expect(checkRus(word)).toBeFalsy());
    });
});