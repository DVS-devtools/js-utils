/* eslint-disable global-require */

const { webpackConfig, webpackConfigPath, loadWebpack } = require('./webpack');
const { requireConfig, customConfigPath, getConfigPath } = require('./getConfig');
const {
    isTypescriptPackage,
    hasTsConfig,
    hasTsLint,
    isIndexTs,
} = require('./isTypescriptPackage');

module.exports = {
    webpackConfig,
    webpackConfigPath,
    loadWebpack,
    requireConfig,
    customConfigPath,
    getConfigPath,
    isTypescriptPackage,
    hasTsConfig,
    hasTsLint,
    isIndexTs,
    getLibraryName: require('./libraryName'),
    freePort: require('./freePort'),
    loadBabel: require('./loadBabel'),
    loadEslint: require('./loadEslint'),
    loadEslintIgnore: require('./loadEslintIgnore'),
    getArgv: require('./getArgv'),
};
