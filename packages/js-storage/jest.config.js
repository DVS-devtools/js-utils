const config = require('../../jest.config');

// We need to override the rootDir because global jest defines as ./packages/PACKAGE_NAME
config.rootDir = './';

config.collectCoverageFrom.push('!src/interfaces.ts');

module.exports = config;
