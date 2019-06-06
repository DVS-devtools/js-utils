# js-dictionary

[![npm version](https://badge.fury.io/js/%40docomodigital%2Fjs-dictionary.svg)](https://badge.fury.io/js/%40docomodigital%2Fjs-dictionary)

Library to get Dictionary values

### Usage
```javascript
import Dictionary from '@docomodigital/js-dictionary';

const dictObject = {
    SEARCH: 'Search!',
    GO_BACK: 'Go Back',
};

Dictionary.init({
    dict: dictObject,
    showKey: 'missing'
});

Dictionary.get('SEARCH'); // 'Search!'
```


## Installation

### NPM
```bash
npm install --save @docomodigital/js-dictionary
```

## Documentation

To read documentation, go to:

[http://docomodigital.github.io/js-utils/js-dictionary/latest](http://docomodigital.github.io/js-utils/js-dictionary/latest)
