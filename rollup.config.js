import path from 'path';
import { production, development } from './rollup.base';
const { getLibraryName } = require('./utils');

const currentPackage = process.cwd();

const packageName = require(path.resolve(currentPackage, 'package.json')).name;
const name = getLibraryName(packageName);

export default [
    development({
        output: {
            file: 'umd/index.js',
            name,
        },
    }),
    production({
        output: {
            file: 'umd/index.min.js',
            name,
        },
    }),
];
