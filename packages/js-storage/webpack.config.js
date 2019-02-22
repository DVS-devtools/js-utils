/* eslint-disable import/no-extraneous-dependencies */
const config = require('../../webpack.config');

config.entry = config.entry.replace('.js', '.ts');

config.module.rules.push({
    enforce: 'pre',
    test: /\.ts$/,
    use: {
        loader: 'tslint-loader',
        options: {
            emitErrors: process.env.NODE_ENV !== 'production',
        }
    },
    exclude: /(node_modules)/,
});

config.resolve.extensions.push('.ts');

module.exports = config;
