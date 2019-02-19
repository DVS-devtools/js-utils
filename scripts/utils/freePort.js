/* eslint-disable import/no-extraneous-dependencies */
const detect = require('detect-port-alt');

function freePort(host, chosenPort) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            detect(chosenPort, host)
                .then((port) => {
                    if (port !== chosenPort) {
                        console.log(`Port ${chosenPort} is used, using ${port}`);
                    }
                    resolve(port);
                })
                .catch(err => reject(err));
        }, Math.random() * (5000 - 1000) + 1000);
    });
}

module.exports = freePort;
