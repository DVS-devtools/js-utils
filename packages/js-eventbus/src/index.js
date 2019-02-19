/**
 * @class JsEventBus
 * @description JsLogger is an advanced logger used for stable production build. You can set
 *  the enable value using the init function depending where you are.
 */
export default {
    addEventListener: (event, cb) => {
        console.log(event, cb);
    }
};
