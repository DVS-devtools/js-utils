/* eslint-disable import/no-extraneous-dependencies,global-require */
process.on('unhandledRejection', (err) => {
    throw err;
});

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const {
    loadEslint,
    loadEslintIgnore,
    isTypescriptPackage,
    hasTsLint,
} = require('../utils');

const buildingPackage = process.cwd();

function lintJs() {
    const { CLIEngine } = require('eslint');
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

function isFileExcluded(filepath, configFile, Matcher) {
    if (
        configFile === undefined
        || configFile.linterOptions === undefined
        || configFile.linterOptions.exclude === undefined
    ) {
        return false;
    }
    const fullPath = path.resolve(filepath);

    return configFile.linterOptions.exclude.some(pattern => new Matcher(pattern).match(fullPath));
}

function lintTs() {
    const { Minimatch } = require('minimatch');
    const { Linter, Configuration } = require('tslint');
    const configName = path.resolve(buildingPackage, 'tslint.json');
    const files = glob.sync('src/**/*', { nodir: true });
    const linter = new Linter({ fix: false });
    const config = Configuration.findConfiguration(configName).results;
    files.filter(file => !isFileExcluded(file, config, Minimatch)).forEach((file) => {
        const fileContents = fs.readFileSync(path.resolve(buildingPackage, file), 'utf8');
        linter.lint(file, fileContents, config);
    });
    const { output, errorCount } = linter.getResult();
    if (output && output.trim()) {
        console.log(' ');
        console.log(`${output}`);
        console.log(' ');
    }
    if (errorCount > 0) {
        process.exit(1);
    } else {
        console.log('All clear');
    }
}

if (isTypescriptPackage(buildingPackage) && hasTsLint(buildingPackage)) {
    lintTs();
} else {
    lintJs();
}
