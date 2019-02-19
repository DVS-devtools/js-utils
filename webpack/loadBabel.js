const path = require('path');
const { requireConfig } = require('../scripts/utils');

const packagePath = process.cwd();

const validConfigNames = ['babel.config.js', '.babelrc', '.babelrc.js'];

module.exports = () => requireConfig(
    packagePath,
    validConfigNames,
    path.resolve(__dirname, '..', 'babel.config.js'),
);
