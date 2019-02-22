import Dictionary from '../src';

const dict = {
    KEY_1: 'key 1',
    KEY_2: 'key 2'
};

Dictionary.init({
    dict,
    showKey: 'all',
});

document.getElementById('root').innerText = Dictionary.get('KEY_1');
console.log(Dictionary.get('KEY_1'));
