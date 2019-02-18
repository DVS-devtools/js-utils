/* eslint-disable import/no-dynamic-require,global-require,import/no-extraneous-dependencies */

process.on('unhandledRejection', (err) => {
    throw err;
});

const { loadWebpack } = require('./utils');

const buildingPackage = process.cwd();

function runCallback(err, stats) {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
        console.error(info.errors);
    }
    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }
}

function build() {
    console.log(`Building from ${buildingPackage}`);
    const Compiler = loadWebpack(buildingPackage);
    Compiler.run(runCallback);
}

build();
