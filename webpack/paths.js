const path = require('path');
const fs = require('fs');
const { isTypescriptPackage } = require('../utils');

const packagePath = process.cwd();

const indexName = isTypescriptPackage(packagePath) ? 'index.ts' : 'index.js';

const entryPath = path.resolve(packagePath, 'src', indexName);

const browserEntry = () => {
    const indexBrowser = path.resolve(packagePath, 'src', 'index.browser.js');
    if (fs.existsSync(indexBrowser)) {
        return indexBrowser;
    }
    return entryPath;
};

module.exports = {
    entryPath,
    browserEntryPath: browserEntry(),
    outputPath: path.resolve(packagePath, 'dist'),
    cssFolder: 'css',
    jsFolder: 'js',
    examplePath: {
        html: path.resolve(packagePath, 'example', 'index.html'),
        js: path.resolve(packagePath, 'example', indexName),
    },
    chunkFilename: '[name].chunk.[chunkhash:8].js',
};
