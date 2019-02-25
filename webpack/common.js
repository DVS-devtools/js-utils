/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const {
    loadBabel,
    loadEslint,
    isTypescriptPackage,
    hasTsLint,
} = require('../utils');

const packagePath = process.cwd();

const rules = [
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    fallback: 'file-loader',
                    name: '[name][md5:hash].[ext]',
                    outputPath: 'assets/',
                    publicPath: '/assets/'
                }
            }
        ]
    },
    {
        enforce: 'pre',
        test: /\.js$/,
        use: {
            loader: 'eslint-loader',
            options: {
                emitWarning: process.env.NODE_ENV !== 'production',
                useEslintrc: false,
                configFile: loadEslint(packagePath),
            },
        },
        exclude: /(node_modules)/,
    },
    {
        test: /\.(js|ts)x?$/,
        use: {
            loader: 'babel-loader',
            options: {
                rootMode: 'upward',
                ...loadBabel(packagePath, true),
            }
        },
        exclude: /(node_modules)/,
    },
];

if (isTypescriptPackage(packagePath) && hasTsLint(packagePath)) {
    rules.push({
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
}

module.exports = {
    module: { rules },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.css', '.scss', '.ts'],
    },
    plugins: [
        new webpack.ProgressPlugin(),
    ],
};
