const path = require('path');

const packagePath = process.cwd();

module.exports = {
    cssFolder: 'css',
    jsFolder: 'js',
    entryPath: path.resolve(packagePath, 'src', 'index.js'),
    browserEntryPath: path.resolve(packagePath, 'src', 'index.browser.js'),
    outputPath: path.resolve(packagePath, 'dist'),
    examplePath: {
        html: path.resolve(packagePath, 'example', 'index.html'),
        js: path.resolve(packagePath, 'example', 'index.js'),
    },
    chunkFilename: '[name].chunk.[chunkhash:8].js',
};
