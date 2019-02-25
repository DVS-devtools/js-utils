const path = require('path');
const { getConfigPath, requireConfig } = require('./getConfig');

const validConfigNames = ['.eslintignore'];

module.exports = (packagePath = process.cwd(), toRequire = false) => {
    const method = toRequire ? requireConfig : getConfigPath;
    return method(
        packagePath,
        validConfigNames,
        path.resolve(__dirname, '..', '.eslintignore'),
    );
};
