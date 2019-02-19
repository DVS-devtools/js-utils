
function getArgv(argv = process.argv) {
    return argv.slice(2);
}

module.exports = getArgv;
