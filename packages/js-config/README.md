# js-config

[![npm version](https://badge.fury.io/js/%40docomodigital%2Fjs-config.svg)](https://badge.fury.io/js/%40docomodigital%2Fjs-config)

Simple library to get config value from a given object, supports nested values.

## Usage
```javascript
import Config from '@docomodigital/js-config';

const configObject = {
    host: 'https://example.com',
    api: {
        version: 'v1',
        routes: {}
    },
    foo: {
        bar: 'test'
    }
}

Config.init({
    config: configObject,
});

Config.get('api.version'); // 'v1'
Config.get('foo'); // { bar: 'test' }
```

If Config is initialized with the flag `upperCase: true`, the keys are searched in uppercase:
```javascript
Config.init({
    config: { KEY: 'value' },
    upperCase: true
});

Config.get('key'); // 'value'
```


## Installation

### NPM
```bash
npm install --save @docomodigital/js-config
```

## Documentation

To read documentation, go to:

[http://docomodigital.github.io/js-config/latest](http://docomodigital.github.io/js-config/latest)
