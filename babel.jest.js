/* eslint-disable import/no-extraneous-dependencies */

process.env.BABEL_ENV = 'test';

module.exports = require('babel-jest').createTransformer({
    rootMode: 'upward',
});
