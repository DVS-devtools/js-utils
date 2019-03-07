import EventBus from '../src/index';

const Bus = new EventBus();

Bus.on('test', (args) => {
    console.log(args);
});

const toOff = () => {
    console.log('other');
};

Bus.on('test', toOff);

document.getElementById('trigger').addEventListener('click', (e) => {
    e.preventDefault();
    Bus.trigger('test', { test: 'ss', foo: 'bar' });
});

document.getElementById('off').addEventListener('click', (e) => {
    e.preventDefault();
    Bus.off('test', toOff);
});

document.getElementById('clear').addEventListener('click', (e) => {
    e.preventDefault();
    Bus.clear('test');
});

const ctx = {
    foo: 'bar'
};

Bus.on('context', function () {
    console.log(this.foo);
}, ctx);

document.getElementById('context').addEventListener('click', (e) => {
    e.preventDefault();
    Bus.trigger('context');
});


document.getElementById('add').addEventListener('click', (e) => {
    e.preventDefault();
    Bus.on('test', () => {
        console.log('trigger');
    });
});
