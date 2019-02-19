/* eslint-disable global-require */

const { webpackConfig, webpackConfigPath, loadWebpack } = require('./webpack');
const { requireConfig, customConfigPath, getConfigPath } = require('./getConfig');

module.exports = {
    webpackConfig,
    webpackConfigPath,
    loadWebpack,
    requireConfig,
    customConfigPath,
    getConfigPath,
    getLibraryName: require('./libraryName'),
    freePort: require('./freePort'),
    loadBabel: require('./loadBabel'),
    loadEslint: require('./loadEslint'),
};
