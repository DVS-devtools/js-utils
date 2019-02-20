import Globals from '../globals';
/* eslint-disable no-console */
/**
 * @memberof JsLogger
 * @function debug
 * @description Debug message for debug logging
 * @param {any} [args] Any params you want to log as debug
 * @returns void
 *
 * @example
 * // Debug JsLogger
 *  JsLogger.debug(1, 'a', [1], {message: 'a message'}, true);
 */
export const debug = (...args) => {
    if (Globals.enable) {
        console.debug(args);
    }
};


/**
 * @memberof JsLogger
 * @function info
 * @description Info message for info logging
 * @param {any} [args] Any params you want to log as info
 * @returns void
 *
 * @example
 * // Info JsLogger
 *  JsLogger.info(1, 'a', [1], {message: 'a message'}, true);
 */
export const info = (...args) => {
    if (Globals.enable) {
        console.info(args);
    }
};


/**
 * @memberof JsLogger
 * @function log
 * @description Log message for log logging
 * @param {any} [args] Any params you want to log as log
 * @returns void
 *
 * @example
 * // Log JsLogger
 *  JsLogger.log(1, 'a', [1], {message: 'a message'}, true);
 */
export const log = (...args) => {
    if (Globals.enable) {
        console.log(args);
    }
};


/**
 * @memberof JsLogger
 * @function warn
 * @description Warn message for warn logging
 * @param {any} [args] Any params you want to log as warn
 * @returns void
 *
 * @example
 * // Warn JsLogger
 *  JsLogger.warn(1, 'a', [1], {message: 'a message'}, true);
 */
export const warn = (...args) => {
    console.warn(args);
};


/**
 * @memberof JsLogger
 * @function error
 * @description Error message for error logging
 * @param {any} [args] Any params you want to log as error
 * @returns void
 *
 * @example
 * // Error JsLogger
 *  JsLogger.error(1, 'a', [1], {message: 'a message'}, true);
 */
export const error = (...args) => {
    console.error(args);
};
/* eslint-enable no-console */
