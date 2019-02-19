/* eslint-disable import/no-dynamic-require,global-require,import/no-extraneous-dependencies */

process.on('unhandledRejection', (err) => {
    throw err;
});

const path = require('path');
const { spawn } = require('child_process');
const { getConfigPath } = require('../utils');

const buildingPackage = process.cwd();

const validConfigNames = ['jest.config.js', 'jest.config.json'];

function argvOptions() {
    return process.argv.slice(2);
}

function runTests(options = []) {
    console.log(`Running tests from ${buildingPackage}`);
    const configPath = getConfigPath(
        buildingPackage,
        validConfigNames,
        path.resolve(__dirname, '..', 'jest.config.js'),
    );

    const jestBin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'jest');
    const jest = spawn(jestBin, ['--config', configPath].concat(options));

    jest.stdout.on('data', data => console.log(data.toString()));
    jest.stderr.on('data', data => console.error(data.toString()));
}

runTests(argvOptions());
