/**
 * @memberof JsAnalytics
 * @function setId
 * @description Set Analytics user id
 * @param {string} id - user id
 *
 * @example
 * JsAnalytics.setId("123rgr");
 */
import global from '../globals';

export default (id) => {
    if (id) {
        global.logger.log('JsAnalytics', 'set id', id);

        if (global.enabled) {
            global.ga('set', '&uid', id);
        }
    }
};
