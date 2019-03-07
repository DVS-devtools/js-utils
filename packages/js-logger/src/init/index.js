/**
 * @memberof JsLogger
 * @function init
 * @description Enable or disable logger for production environment. If set to false, only warnings
 * and error will be logged.
 * @param {Object} options (see attributes below)
 * @param {String} [options.enable=false] enable/disable log
 * @param {Object|String} [options.level='log'] specify logger levels
 * @param {Function} [options.emit] Pass a custom function to to use for log

 *
 * @example
 * // Initialize JsLogger
 *  JsLogger.init({
 *      enable: true
 *  });
 */

import Globals from '../globals';

const loggerLevels = ['debug', 'log', 'table', 'info', 'warn', 'error'];

const setLevel = (levels) => {
    if (typeof levels === 'string') {
        if (!loggerLevels.includes(levels)) {
            throw new Error(`Logger:: unknown level ${levels}`);
        } else {
            Globals.levels = loggerLevels.reduce((obj, level, i) => {
                obj[level] = loggerLevels.indexOf(levels) <= i;
                return obj;
            }, {});
        }
    } else if (typeof levels === 'object' && levels !== null) {
        Globals.levels = Object.keys(levels).reduce((obj, level) => {
            if (typeof levels[level] !== 'boolean') {
                throw new Error(`Logger:: illegal value type for level ${level} - expected boolean, got ${typeof levels[level]}`);
            }
            if (loggerLevels.includes(level)) {
                obj[level] = !!levels[level];
            }
            return obj;
        }, Globals.levels);
    }
};

const setEmitFn = (emit) => {
    const match = loggerLevels.every(lvl => Object.keys(emit).includes(lvl));
    if (!match) {
        console.warn('The passed emit object does not match the logger schema, some levels may not work'); // eslint-disable-line no-console
    }
    Globals.emit = emit;
};

export default (options) => {
    Globals.enable = options.enable;
    if (options.level) {
        setLevel(options.level);
    }

    if (options.emit) {
        setEmitFn(options.emit);
    }
};
