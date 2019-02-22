const path = require('path');
const fs = require('fs');

const packagePath = process.cwd();

const entryPath = path.resolve(packagePath, 'src', 'index.js');

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
        js: path.resolve(packagePath, 'example', 'index.js'),
    },
    chunkFilename: '[name].chunk.[chunkhash:8].js',
};
