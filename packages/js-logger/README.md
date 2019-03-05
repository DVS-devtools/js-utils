# js-logger

[![npm version](https://badge.fury.io/js/%40docomodigital%2Fjs-logger.svg)](https://badge.fury.io/js/%40docomodigital%2Fjs-logger)
[![Greenkeeper badge](https://badges.greenkeeper.io/docomodigital/js-logger.svg)](https://greenkeeper.io/)

Advanced logger used for stable production build.

## Usage

Using the node environment variables, you can decide to enable logger only in a stage environment and disable it while you are in a production environment.

```javascript
// init jsLogger and disable it for production environment
jsLogger.init({
	enable: process.env.NODE_ENV !== 'production',
});

// debug function
jsLogger.debug("Hello, I'm a debug log");

// info function
jsLogger.info("Hello, I'm an info log");

// log function
jsLogger.log("Hello, I'm a log log");

// warn function
jsLogger.warn("Hello, I'm a warn log");

// error function
jsLogger.error("Hello, I'm an error log");
```

## Installation

### NPM
```bash
npm install --save @docomodigital/js-logger
```

## Documentation

To read documentation, go to:

[http://docomodigital.github.io/js-logger/latest](http://docomodigital.github.io/js-logger/latest)
