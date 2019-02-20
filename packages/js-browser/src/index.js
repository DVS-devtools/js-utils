/**
 * @class JsBrowser
 * @description JsBrowser provides you an alternative method to manage previous
 * and current page changements. Is particularly used to get query params as
 * object and to get the previous page in order to implement an easy and basic history
 * in your routing
 */

import getQueryParams from './getQueryParams';

class Browser {
    constructor() {
        this.currentPage = null;
        this.prevPage = null;

        /**
         * @see modules/getQueryParams
         */
        this.getQueryParams = getQueryParams;

        this.shiftPage = this.shiftPage.bind(this);
        this.getPrevPage = this.getPrevPage.bind(this);
    }

    /**
     * @memberof JsBrowser
     * @function shiftPage
     * @description Adapt the Browser.prevPage and Browser.currentPage
     * according to route's changement.
     *
     * **NB:** route changements must be specified in your routing changement function observer
     * @param {String} currentPage set the previous page to the actual Browser.currentPage, then
     * set the Browser.currentPage to the given new value
     *
     * @example
     * // Browser.shiftPage();
     *
     * import Browser from 'js-browser';
     *
     *
     * Browser.shiftPage('/newPage');
     */
    shiftPage(currentPage) {
        if (currentPage && this.currentPage !== currentPage) {
            this.prevPage = this.currentPage;
            this.currentPage = currentPage;
        }
    }

    /**
     * @memberof JsBrowser
     * @function getPrevPage
     * @description Return the previous page you visited, if is empty, then returns null.
     *
     * @returns {String} previous page visited (ie: '/home')
     *
     * @example
     * // Browser.getPrevPage();
     *
     * import Browser from 'js-browser';
     *
     *
     * const prevPage = Browser.getPrevPage(); // '/home'
     */
    getPrevPage() {
        return this.prevPage;
    }
}

export default new Browser();
