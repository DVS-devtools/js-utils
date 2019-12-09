import path from 'path';
import fs from 'fs';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';

const isTs = fs.existsSync(path.resolve(process.cwd(), 'tsconfig.json'));
const hasBrowserEntry = fs.existsSync(path.resolve(process.cwd(), `src/index.browser.${isTs ? 'ts' : 'js'}`));
const input = `src/index.${hasBrowserEntry ? 'browser.' : ''}${isTs ? 'ts' : 'js'}`;
const commonGlobals = {};

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const babelOptions = {
    extensions,
    exclude: /node_moduels/,
    runtimeHelpers: true,
    // When running, the current cwd is the package folder
    configFile: path.resolve(process.cwd(), '../..', 'babel.config.js'),
};

const commonJsOptions = {
    ignoreGlobal: true,
    include: /node_modules/,
};

function onWarn(warning) {
    throw Error(typeof warning === 'string' ? warning : warning.message);
}

const commonConfig = {
    input,
    onwarn: onWarn,
};

const commonPlugins = [
    nodeResolve({ extensions }),
    commonjs(commonJsOptions),
    babel(babelOptions),
    nodeGlobals(),
];

export const development = (overrides) => {
    const globals = {
        ...commonGlobals,
        ...overrides.globals,
    };

    return {
        ...commonConfig,
        external: Object.keys(globals),
        output: {
            format: 'umd',
            globals,
            ...overrides.output,
        },
        plugins: [
            ...commonPlugins,
            replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
        ],
    };
};

export const production = (overrides) => {
    const globals = {
        ...commonGlobals,
        ...overrides.globals,
    };

    return {
        ...commonConfig,
        external: Object.keys(globals),
        output: {
            format: 'umd',
            globals,
            ...overrides.output,
        },
        plugins: [
            ...commonPlugins,
            replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
            terser(),
        ],
    };
};
