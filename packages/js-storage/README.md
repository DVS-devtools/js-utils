## js-storage

[![npm version](https://badge.fury.io/js/%40docomodigital%2Fjs-storage.svg)](https://badge.fury.io/js/%40docomodigital%2Fjs-storage)

Storage is the library to save and get data in different ways.

## Usage
```javascript
import Storage from '@docomodigital/js-storage';

// Set an item in the storage
Storage.set('locale', 'en');

// Get a previously setted item from the storage
Storage.get('locale'); // 'en'

// Delete an item from the storage if present
Storage.delete('locale');

// Switch to another Storage (window.localStorage), default is cookie
Storage.setStorage('localstorage');
```

## Installation

### NPM
```bash
npm install --save @docomodigital/js-storage
```

## Documentation

To read documentation, go to:

[http://docomodigital.github.io/js-storage/latest](http://docomodigital.github.io/js-storage/latest)
