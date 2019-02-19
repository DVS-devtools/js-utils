/* eslint-disable import/no-dynamic-require,global-require,import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const getLibraryName = require('./libraryName');

/**
 * Return the webpack.config.js path to use
 * If there is a webpack.config.js file inside the package dir, returns it,
 * else, fallback to the repo root webpack.config.js
 * @param buildingPackageDir
 * @return {string}
 */
function webpackConfigPath(buildingPackageDir) {
    const customConfigPath = path.resolve(buildingPackageDir, 'webpack.config.js');
    if (fs.existsSync(customConfigPath)) {
        return customConfigPath;
    }
    return path.resolve(__dirname, '..', '..', 'webpack.config.js');
}

/**
 * Return the webpack config object to use
 * Adds the LibraryName from the package dir package.json name field
 * @param buildingPackageDir
 * @return {any}
 */
function webpackConfig(buildingPackageDir) {
    const baseConfig = require(webpackConfigPath(buildingPackageDir));
    const packageJson = require(path.resolve(buildingPackageDir, 'package.json'));

    baseConfig.output.library = getLibraryName(packageJson.name);

    return baseConfig;
}

/**
 * Create an instance of the Webpack bundler
 * @param packageDirOrCustomConfig
 * @return {import("../Compiler")|MultiCompiler}
 */
function loadWebpack(packageDirOrCustomConfig) {
    let config;
    if (typeof packageDirOrCustomConfig === 'string') {
        config = webpackConfig(packageDirOrCustomConfig);
    } else {
        config = packageDirOrCustomConfig;
    }
    return webpack(config);
}

module.exports = {
    webpackConfigPath,
    webpackConfig,
    loadWebpack,
};
