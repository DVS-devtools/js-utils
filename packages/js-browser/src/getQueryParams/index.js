/**
 * @memberof JsBrowser
 * @function getQueryParams
 * @description Return the query params object (this will work only if query params
 * are after the hashbang)
 * @returns {Object} {queryParamsKey1: queryParamsValue1, queryParamsKey2: queryParamsValue2... }
 *
 * @example
 * import Browser from 'js-browser';
 *
 *
 * const queryParams = Browser.getQueryParams();
 */

export default () => {
    // take from BarneyBrowser.getQueryParams, we can change this after
    const url = window.location.href;
    const vars = {};
    let hash;

    if (url.indexOf('?') !== -1) {
        const querystring = url.slice(url.indexOf('?') + 1);
        if (querystring) {
            const hashes = querystring.split('&');

            for (let i = 0; i < hashes.length; i += 1) {
                if (hashes[i].indexOf('=') !== -1) {
                    hash = hashes[i].split('=');

                    vars[hash[0]] = window.decodeURIComponent(hash[1]);
                }
            }
        }
    }
    return vars;
};
