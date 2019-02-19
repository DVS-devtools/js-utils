
module.exports = {
    babelrcRoots: [
        '.',
        'packages/*',
    ],
    presets: [
        '@babel/preset-env',
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-object-rest-spread',
        ['@babel/plugin-proposal-class-properties', { loose: true }],
    ]
};
