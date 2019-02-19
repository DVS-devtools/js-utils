const path = require('path');

const coveragePath = () => {
    const buildingPackage = path.basename(process.cwd());
    const glob = 'src/**/*.js';
    return [`packages/${buildingPackage}/${glob}`];
};

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: coveragePath(),
    transform: {
        '^.+\\.js?$': './babel.jest.js'
    },
    coverageReporters: ['lcov', 'text', 'text-summary']
};
