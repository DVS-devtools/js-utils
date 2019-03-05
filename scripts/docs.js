/* eslint-disable import/no-dynamic-require,import/no-extraneous-dependencies,global-require */
process.on('unhandledRejection', (err) => {
    throw err;
});

const path = require('path');
const { spawn } = require('child_process');
const {
    getConfigPath,
    requireConfig,
    getArgv,
    isTypescriptPackage,
    hasTypeDoc,
} = require('../utils');

const buildingPackage = process.cwd();

const validConfigNames = ['.jsdoc.js', '.jsdoc.json'];

function getVersion() {
    const argv = getArgv();
    const arg = argv.find(a => a.startsWith('--version='));
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
    return path.join(baseDistFolder, getVersion());
}

function docsJs(options = []) {
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
    jsdoc.on('exit', (code) => {
        process.exit(code);
    });
}

function docsTs() {
    console.log(`Generating docs from ${buildingPackage}`);
    const config = requireConfig(
        buildingPackage,
        ['typedoc.json'],
        path.resolve(__dirname, '..', 'typedoc.json')
    );
    const dest = path.join(config.out || path.resolve(__dirname, '..', 'docs', buildingPackage), getVersion());
    const { Application } = require('typedoc');
    const app = new Application(config);
    const project = app.convert(app.expandInputFiles(['src']));
    if (project) {
        if (!app.generateDocs(project, dest)) {
            process.exit(1);
        }
    } else {
        process.exit(1);
    }
}

if (isTypescriptPackage(buildingPackage) && hasTypeDoc(buildingPackage)) {
    docsTs(getArgv());
} else {
    docsJs(getArgv());
}
