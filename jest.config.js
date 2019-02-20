const path = require('path');

const isRootTests = () => process.cwd() === __dirname;

const rootDir = isRootTests() ? './' : `packages/${path.basename(process.cwd())}`;

const coveragePath = () => {
    let glob;
    if (isRootTests()) {
        glob = 'packages/*/src/**/*.js';
    } else {
        glob = 'src/**/*.js';
    }
    return [
        `${glob}`,
        '!/index.js',
        '!globals.js',
    ];
};

module.exports = {
    rootDir,
    collectCoverage: true,
    collectCoverageFrom: coveragePath(),
    transform: {
        '^.+\\.js?$': path.resolve(__dirname, './babel.jest.js')
    },
    coverageReporters: ['lcov', 'text', 'text-summary']
};
