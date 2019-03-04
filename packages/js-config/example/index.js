import Config from '../src/index';

const config = {
    foo: {
        bar: 'test'
    }
};

Config.init({
    config
});

document.getElementById('root').innerText = Config.get('foo.bar');
console.log(Config.get('foo.bar'));
