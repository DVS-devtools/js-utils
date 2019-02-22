const path = require('path');

const isRootTests = () => process.cwd() === __dirname;

const rootDir = isRootTests() ? './' : `packages/${path.basename(process.cwd())}`;

const coveragePath = () => {
    let rootPath;
    if (isRootTests()) {
        rootPath = 'packages/*/src';
    } else {
        rootPath = 'src';
    }
    const glob = path.join(rootPath, '/**/*.js');
    return [
        `${glob}`,
        `!${path.join(rootPath, 'index.js')}`,
        `!${path.join(rootPath, 'index.browser.js')}`,
        `!${path.join(rootPath, 'globals.js')}`,
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
