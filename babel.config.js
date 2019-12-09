const isProd = process.env.NODE_ENV === 'production';
const babelEnv = process.env.BABEL_ENV;

const esProdPlugins = [
    ['@babel/plugin-transform-runtime', { useESModules: true }],
];

module.exports = {
    babelrcRoots: [
        '.',
        'packages/*',
    ],
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: false,
                modules: ['esm', 'production-umd'].includes(babelEnv) ? false : 'cjs',
                debug: !isProd,
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
    ignore: [
        /@babel[\\|/]runtime/,
    ],
    env: {
        cjs: {
            plugins: [],
            ignore: [
                /.*\/index.browser\.js$/,
                /.*\.test\.js$/,
                /.*\.test\.ts$/,
            ]
        },
        test: {
            plugins: [
                '@babel/plugin-transform-runtime',
            ],
        },
        esm: {
            plugins: esProdPlugins,
            ignore: [
                /.*\/index.browser\.js$/,
                /.*\.test\.js$/,
                /.*\.test\.ts$/,
            ],
        },
        production: {
            plugins: esProdPlugins,
            ignore: [
                /.*\/index.browser\.js$/,
                /.*\.test\.js$/,
                /.*\.test\.ts$/,
            ],
        },
        'production-umd': {
            plugins: esProdPlugins,
            ignore: [
                /.*\.test\.js$/,
                /.*\.test\.ts$/,
            ]
        },
    },
};
