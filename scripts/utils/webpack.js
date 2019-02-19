/* eslint-disable import/no-dynamic-require,global-require,import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const getLibraryName = require('./libraryName');

function webpackConfigPath(buildingPackageDir) {
    const customConfigPath = path.resolve(buildingPackageDir, 'webpack.config.js');
    if (fs.existsSync(customConfigPath)) {
        return customConfigPath;
    }
    return path.resolve(__dirname, '..', '..', 'webpack.config.js');
}

function webpackConfig(buildingPackageDir) {
    const baseConfig = require(webpackConfigPath(buildingPackageDir));
    const packageJson = require(path.resolve(buildingPackageDir, 'package.json'));

    baseConfig.output.library = getLibraryName(packageJson.name);

    return baseConfig;
}

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
