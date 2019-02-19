const path = require('path');
const { getConfigPath, requireConfig } = require('./getConfig');

const validConfigNames = ['babel.config.js', '.babelrc', '.babelrc.js'];

module.exports = (packagePath = process.cwd(), toRequire = false) => {
    const method = toRequire ? requireConfig : getConfigPath;
    return method(
        packagePath,
        validConfigNames,
        path.resolve(__dirname, '..', 'babel.config.js'),
    );
};
