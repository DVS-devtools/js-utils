/* eslint-disable import/no-extraneous-dependencies */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonPaths = require('./paths');

const common = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            camelCase: true,
                            localIdentName: '[local]___[hash:base64:5]',
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${commonPaths.cssFolder}/[name].css`,
            chunkFilename: '[id].css',
        }),
    ],
    devtool: 'source-map',
};

const config = {
    umd: {
        ...common,
        entry: commonPaths.entryPath,
        output: {
            path: commonPaths.outputPath,
            filename: 'index.js',
            library: '',
            libraryTarget: 'umd',
            umdNamedDefine: true,
            chunkFilename: commonPaths.chunkFilename,
        }
    },
    browser: {
        ...common,
        entry: commonPaths.browserEntryPath,
        output: {
            path: commonPaths.outputPath,
            filename: 'index.min.js',
            library: '',
            libraryTarget: 'var',
            libraryExport: 'default',
            umdNamedDefine: true,
        }
    }
};

const target = process.env.BUILD_TARGET;

module.exports = config[target];
