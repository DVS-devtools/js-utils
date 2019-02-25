import JsStorage from '../src'; // tslint:disable-line import-name

console.log(JsStorage);

JsStorage.setLogger(console, true);
JsStorage.setStorage('localstorage');

JsStorage.set('ciao', 'test');

document.write(JsStorage.get('ciao'));
