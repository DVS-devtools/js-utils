/**
 * @class JsAnalytics
 * @description Adapter for Google Analytics
 */
import init from './init';
import setId from './setId';
import setDimension from './setDimension';
import trackPage from './trackPage';
import trackEvent from './trackEvent';

export default {
    /**
     * @see modules/init
     */
    init,
    /**
     * @see modules/setId
     */
    setId,
    /**
     * @see modules/setDimension
     */
    setDimension,
    /**
     * @see modules/trackPage
     */
    trackPage,
    /**
     * @see modules/trackEvent
     */
    trackEvent,
};
