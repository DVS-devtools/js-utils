/* eslint-disable import/no-dynamic-require,global-require */
process.on('unhandledRejection', (err) => {
    throw err;
});

const path = require('path');
const { spawn } = require('child_process');
const { getConfigPath, requireConfig, getArgv } = require('../utils');

const buildingPackage = process.cwd();

const validConfigNames = ['.jsdoc.js', '.jsdoc.json'];

function getVersion() {
    const argv = getArgv();
    const arg = argv.find(arg => arg.startsWith('--version='));
    if (!arg) {
        return require(path.join(buildingPackage, 'package.json')).version;
    }
    return arg.split('=')[1];
}

function distFolder() {
    const baseDistFolder = requireConfig(
        buildingPackage,
        validConfigNames,
        path.resolve(__dirname, '..', '.jsdoc.js'),
    ).opts.destination || path.resolve(__dirname, '..', 'docs', buildingPackage);
    const version = getVersion();
    return path.join(baseDistFolder, version);
}

function docs(options = []) {
    console.log(`Generating docs from ${buildingPackage}`);
    const configPath = getConfigPath(
        buildingPackage,
        validConfigNames,
        path.resolve(__dirname, '..', '.jsdoc.js'),
    );

    options = options.filter(opt => !opt.startsWith('--version='));

    const jsDocBin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'jsdoc');
    const jsdoc = spawn(jsDocBin, ['-c', configPath, '-d', distFolder()].concat(options));

    jsdoc.stdout.on('data', data => console.log(data.toString()));
    jsdoc.stderr.on('data', data => console.error(data.toString()));
}

docs(getArgv());
