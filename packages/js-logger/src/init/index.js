/**
 * @memberof JsLogger
 * @function init
 * @description Enable or disable logger for production environment. If set to false, only warnings
 * and error will be logged.
 * @param {Object} options (see attributes below)
 * @param {String} [options.enable=false] enable/disable log

 *
 * @example
 * // Initialize JsLogger
 *  JsLogger.init({
 *      enable: true
 *  });
 */

import Globals from '../globals';

export default (options) => {
    Globals.enable = options.enable;
};
