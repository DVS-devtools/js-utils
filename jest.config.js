const path = require('path');
const { isTypescriptPackage } = require('./utils');

const isRootTests = () => process.cwd() === __dirname;

const rootDir = isRootTests() ? './' : `packages/${path.basename(process.cwd())}`;

const isTs = isTypescriptPackage(process.cwd());

const coveragePath = () => {
    let rootPath;
    if (isRootTests()) {
        rootPath = 'packages/*/src';
    } else {
        rootPath = 'src';
    }
    const ext = isTs ? 'ts' : 'js';
    const glob = path.join(rootPath, `/**/*.${ext}`);
    return [
        `${glob}`,
        `!${path.join(rootPath, `index.${ext}`)}`,
        `!${path.join(rootPath, `index.browser.${ext}`)}`,
        `!${path.join(rootPath, `globals.${ext}`)}`,
    ];
};

module.exports = {
    rootDir,
    collectCoverage: true,
    collectCoverageFrom: coveragePath(),
    transform: {
        '^.+\\.js?$': path.resolve(__dirname, './babel.jest.js'),
        '^.+\\.ts$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
    coverageReporters: ['lcov', 'text', 'text-summary']
};
