const config = require('../../jest.config');

config.rootDir = './';
config.transform['^.+\\.ts$'] = 'ts-jest';
config.testRegex = '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$';
config.moduleFileExtensions = [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
];

config.collectCoverageFrom = [
    'src/**/*.ts',
    '!src/index.ts',
    '!src/interfaces.ts',
];

module.exports = config;
