const path = require('path');

const rootDir = `packages/${path.basename(process.cwd())}`;

const coveragePath = () => {
    const glob = 'src/**/*.js';
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
