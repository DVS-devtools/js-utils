const r = m => require.resolve(m);

function preset() {
    return {
        presets: [
            r('@babel/preset-env'),
        ],
        plugins: [
            r('@babel/plugin-transform-runtime'),
            [r('@babel/plugin-proposal-decorators'), { legacy: true }],
            r('@babel/plugin-proposal-export-namespace-from'),
            r('@babel/plugin-syntax-dynamic-import'),
            r('@babel/plugin-proposal-object-rest-spread'),
            [r('@babel/plugin-proposal-class-properties'), { loose: true }],
        ]
    };
}

// module.exports = preset();

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
