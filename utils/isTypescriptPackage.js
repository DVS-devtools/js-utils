const path = require('path');
const fs = require('fs');

const hasTsConfig = (packagePath = process.cwd()) => (
    fs.existsSync(path.resolve(packagePath, 'tsconfig.json'))
);

const hasTsLint = (packagePath = process.cwd()) => (
    fs.existsSync(path.resolve(packagePath, 'tslint.json'))
);

const isIndexTs = (packagePath = process.cwd()) => (
    fs.existsSync(path.resolve(packagePath, 'src', 'index.ts'))
);

const isTypescriptPackage = (packagePath = process.cwd()) => (
    hasTsConfig(packagePath) && isIndexTs(packagePath)
);

module.exports = {
    hasTsConfig,
    hasTsLint,
    isIndexTs,
    isTypescriptPackage,
};
