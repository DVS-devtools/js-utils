/**
 * @class JsLogger
 * @description JsLogger is an advanced logger used for stable production build. You can set
 *  the enable value using the init function depending where you are.
 */
import init from './init';
import {
    debug, info, log, warn, error
} from './logger';

export default {
    /**
     * @see modules/init
     */
    init,

    /**
     * @see modules/debug
     */
    debug,

    /**
     * @see modules/info
     */
    info,

    /**
     * @see modules/log
     */
    log,

    /**
     * @see modules/warn
     */
    warn,

    /**
     * @see modules/error
     */
    error
};
