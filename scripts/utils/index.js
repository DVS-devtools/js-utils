/* eslint-disable import/no-dynamic-require,global-require,import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const detect = require('detect-port-alt');
const { upperFirst, camelCase } = require('lodash');

const upperCamelcase = text => upperFirst(camelCase(text));

function getLibraryName(packageName) {
    const isOrg = packageName.indexOf('@') === 0 && packageName.indexOf('/') > 0;
    if (isOrg) {
        return upperCamelcase(packageName.split('/')[1]);
    }
    return upperCamelcase(packageName);
}

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

function freePort(host, chosenPort) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            detect(chosenPort, host)
                .then((port) => {
                    if (port !== chosenPort) {
                        console.log(`Port ${chosenPort} is used, using ${port}`);
                    }
                    resolve(port);
                })
                .catch(err => reject(err));
        }, Math.random() * (10000 - 1000) + 1000);
    });
}

module.exports = {
    upperCamelcase,
    getLibraryName,
    webpackConfig,
    webpackConfigPath,
    loadWebpack,
    freePort,
};
