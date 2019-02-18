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

module.exports = preset;
