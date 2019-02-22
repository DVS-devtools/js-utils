/**
 * @class Dictionary
 * @description Library to get Dictionary values
 */
class Dictionary {
    constructor() {
        this.get = this.get.bind(this);
        this.list = this.list.bind(this);
    }

    /**
     * @memberOf Dictionary
     * @function init
     * @description Initialize the Dictionary class
     * @param {Object} options (see attributes below)
     * @param {Object} [options.dict = {}] dictionary object with the required translations
     * @param {String} [options.showKey = 'all'] flag to specify the behaviour
     * when no key is found:
     * 'all' = Show always the key (debug purpose);
     * 'missing' = Show the key only if no translation is found
     * false | null = Show empty string if no translation is found
     * @example
     * Dictionary.init({
     *     dict: dictObject,
     *     showKey: false
     * });
     */
    init(options = { dict: {}, showKey: 'all' }) {
        if (options) {
            this.parameters = options;
        }
    }

    /**
     * @memberOf Dictionary
     * @function get
     * @description Search the given key,
     * return based on the showKey value
     * @see init
     * @param {String} key
     * @returns {*}
     */
    get(key) {
        // convert key to upper case
        key = key.toUpperCase();

        if (this.parameters.showKey === 'all') {
            // 'all case':
            // valued keys : show key name
            // void keys : show key name
            return `[[${key}]]`;
        }
        if (this.parameters.showKey === 'missing') {
            // 'missing' case:
            // valued keys : show value of key
            // void keys : show key name
            if (this.parameters.dict[key]) {
                return this.parameters.dict[key];
            }
            return `[[${key}]]`;
        }
        // standard case
        // valued keys : show value of key
        // void keys : show void string
        if (this.parameters.dict[key]) {
            return this.parameters.dict[key];
        }
        return '';
    }

    /**
     * @memberOf Dictionary
     * @function list
     * @description Returns the entire dict object
     * @returns {Dictionary.options.dict|{}}
     */
    list() {
        return this.parameters.dict;
    }
}

export default new Dictionary();
