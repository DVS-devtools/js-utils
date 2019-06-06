# js-eventbus

[![npm version](https://badge.fury.io/js/%40docomodigital%2Fjs-eventbus.svg)](https://badge.fury.io/js/%40docomodigital%2Fjs-eventbus)

Simple library to trigger custom events

## Usage
```javascript
import EventBus from '@docomodigital/js-eventbus';

const Bus = new EventBus();

const callback = (options) => {
    console.log(options.foo);
};

Bus.on('customEvent', callback);

Bus.trigger('customEvent', { foo: 'bar' }); // console.log('bar')
```

## Installation

### NPM
```bash
npm install --save js-eventbus
```

## Documentation

To read documentation, go to:

[http://docomodigital.github.io/js-utils/js-eventbus/latest](http://docomodigital.github.io/js-utils/js-eventbus/latest)
