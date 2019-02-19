const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const { babelOptions } = require('./loadBabel');

const packagePath = process.cwd();

function getEslintRc() {
    const customEslintRc = path.resolve(packagePath, '.eslintrc.js');
    if (fs.existsSync(customEslintRc)) {
        return customEslintRc;
    }
    return path.resolve(__dirname, '..', '.eslintrc.js');
}

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
                        configFile: getEslintRc(),
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
                        ...babelOptions(),
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
