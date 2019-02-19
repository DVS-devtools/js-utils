/* eslint-disable import/no-extraneous-dependencies */
const detect = require('detect-port-alt');

/**
 * Check if the given port on the given host is free, if not, return the next first free port
 * @param host
 * @param chosenPort
 * @return {Promise<any>}
 */
function freePort(host, chosenPort) {
    return new Promise((resolve, reject) => {
        // If multiple processes are running (es lerna run)
        // it can fail and return a port that is going to be used by one of the concurrent process,
        // waiting a random number of seconds is a bad workaround, but I have no other simpler ideas
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
