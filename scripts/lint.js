/* eslint-disable import/no-extraneous-dependencies */
const { CLIEngine } = require('eslint');
const { loadEslint, loadEslintIgnore } = require('../utils');

const buildingPackage = process.cwd();

function lint() {
    const cli = new CLIEngine({
        cwd: buildingPackage,
        useEslintrc: false,
        extensions: ['.js'],
        ignore: true,
        configFile: loadEslint(buildingPackage),
        ignorePath: loadEslintIgnore(buildingPackage),
    });
    let report;
    try {
        report = cli.executeOnFiles(['src/**']);
    } catch (e) {
        if (e.messageTemplate && ['file-not-found', 'all-files-ignored'].includes(e.messageTemplate)) {
            console.log('All clear');
            return;
        }
    }
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
