/* eslint-disable import/no-dynamic-require,global-require */
const path = require('path');
const fs = require('fs');

function customConfigPath(buildPath, validConfigNames) {
    return validConfigNames.find((filename) => {
        const configPath = path.resolve(buildPath, filename);
        return fs.existsSync(configPath);
    });
}

function getConfigPath(buildPath, validConfigNames, fallback) {
    let configFile;
    const customConfig = customConfigPath(buildPath, validConfigNames);
    if (customConfig) {
        configFile = customConfig;
    } else {
        configFile = fallback;
    }
    return configFile;
}

function requireConfig(buildPath, validConfigNames, fallback) {
    return require(getConfigPath(buildPath, validConfigNames, fallback));
}

module.exports = {
    requireConfig,
    getConfigPath,
    customConfigPath,
};
