/* eslint-disable import/no-dynamic-require,global-require,import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');

const packagePath = process.cwd();

const validConfigNames = ['babel.config.js', '.babelrc', '.babelrc.js'];

function customBabelConfigPath(buildPath) {
    return validConfigNames.find((filename) => {
        const customConfigPath = path.resolve(buildPath, filename);
        return fs.existsSync(customConfigPath);
    });
}

function getBabelConfigPath(buildPath) {
    let configFile;
    const customConfig = customBabelConfigPath(buildPath);
    if (customConfig) {
        configFile = customConfig;
    } else {
        configFile = path.resolve(__dirname, '..', 'babel.config.js');
    }
    return configFile;
}

function babelOptions(buildPath = packagePath) {
    const configPath = getBabelConfigPath(buildPath);
    console.log(`Using babel config: ${configPath}`);
    return require(configPath);
}

module.exports = {
    babelOptions,
    getBabelConfigPath,
    customBabelConfigPath,
};
