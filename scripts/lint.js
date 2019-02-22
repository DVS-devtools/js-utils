/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { CLIEngine } = require('eslint');
const { loadEslint } = require('../utils');

const buildingPackage = process.cwd();

function lint() {
    const cli = new CLIEngine({
        cwd: buildingPackage,
        useEslintrc: false,
        configFile: loadEslint(buildingPackage),
    });
    const report = cli.executeOnFiles(['src/**']);
    let formatter;
    try {
        formatter = cli.getFormatter();
    } catch (e) {
        console.error(e.message);
        return;
    }
    const output = formatter(report.results);
    if (output) {
        console.info(output);
        process.exit(1);
    } else {
        console.log('All clear');
    }
}

lint();
