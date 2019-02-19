/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const { loadBabel, loadEslint } = require('../utils');

const packagePath = process.cwd();

module.exports = {
    module: {
        rules: [
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
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        rootMode: 'upward',
                        ...loadBabel(packagePath, true),
                    }
                },
                exclude: /(node_modules)/,
            },
        ]
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.css', '.scss'],
    },
    plugins: [
        new webpack.ProgressPlugin(),
    ],
};
