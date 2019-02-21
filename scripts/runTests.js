process.on('unhandledRejection', (err) => {
    throw err;
});

const path = require('path');
const { spawn } = require('child_process');
const { getConfigPath, getArgv } = require('../utils');

const buildingPackage = process.cwd();

const validConfigNames = ['jest.config.js', 'jest.config.json'];

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
    jest.on('exit', (code) => {
        process.exit(code);
    });
}

runTests(getArgv());
