# js-platform

[![npm version](https://badge.fury.io/js/%40docomodigital%2Fjs-platform.svg)](https://badge.fury.io/js/%40docomodigital%2Fjs-platform)

Allow to get the current user agent on your device.

## Usage
```javascript
import { JsPlatform } from 'js-platform';

// create a JsPlatform new instance
const Platform = new JsPlatform();

// Get the current user agent

// Print: "Hello, I'm a ios/android/desktop device!"
console.log("Hello, I'm a " + Platform.OS + " device!");  
```

## Installation

### NPM
```bash
npm install --save @docomodigital/js-platform
```

## Documentation

To read documentation, go to:

[http://docomodigital.github.io/js-platform/latest](http://docomodigital.github.io/js-platform/latest)

or run the following command insite the js-platform folder: 
```bash
npm run doc:open
```


151.101.240.133
