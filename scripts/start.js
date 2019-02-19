/* eslint-disable import/no-dynamic-require,global-require,import/no-extraneous-dependencies */
const path = require('path');

process.on('unhandledRejection', (err) => {
    throw err;
});

// const WebpackDevServer = require('webpack-dev-server');
const { spawn } = require('child_process');
const {
    // loadWebpack,
    webpackConfig,
    webpackConfigPath,
    freePort,
} = require('./utils');

const buildingPackage = process.cwd();

function start() {
    console.log(`Starting from ${buildingPackage}`);
    const configPath = webpackConfigPath(buildingPackage);
    const config = webpackConfig(buildingPackage);
    const wdsBin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'webpack-dev-server');

    const port = config.devServer.port || 3000;
    const host = config.devServer.host || '127.0.0.1';

    freePort(host, port).then((free) => {
        const wds = spawn(wdsBin, ['--config', configPath, '--port', free, '--open']);

        wds.stdout.on('data', data => console.log(data.toString()));
        wds.stderr.on('data', data => console.error(data.toString()));
    });
    // TODO using webpack-dev-server Node Api some features do not works,
    //  like opening the browser and livereload (no ws socket is attached to the client),
    //  this is why we have to spawn a new cli process, the console output is not well formatted...
}

start();
