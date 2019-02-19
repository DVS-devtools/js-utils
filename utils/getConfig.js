/* eslint-disable import/no-dynamic-require,global-require */
const path = require('path');
const fs = require('fs');

/**
 * Check if one of the validConfigNames files exists in the passed packagePath,
 * return the first match
 * @param packagePath
 * @param validConfigNames
 * @return {*}
 */
function customConfigPath(packagePath, validConfigNames) {
    return validConfigNames.find((filename) => {
        const configPath = path.resolve(packagePath, filename);
        return fs.existsSync(configPath);
    });
}

/**
 * Get the config file to use for the given packagePath,
 * if no config files are found inside the packagePath, return the fallback
 * @param packagePath
 * @param validConfigNames
 * @param fallback
 * @return {*}
 */
function getConfigPath(packagePath, validConfigNames, fallback) {
    let configFile;
    const customConfig = customConfigPath(packagePath, validConfigNames);
    if (customConfig) {
        configFile = customConfig;
    } else {
        configFile = fallback;
    }
    return configFile;
}

/**
 * Require the config file to use for the given packagePath
 * @param packagePath
 * @param validConfigNames
 * @param fallback
 * @return {any}
 */
function requireConfig(packagePath, validConfigNames, fallback) {
    return require(getConfigPath(packagePath, validConfigNames, fallback));
}

module.exports = {
    requireConfig,
    getConfigPath,
    customConfigPath,
};
