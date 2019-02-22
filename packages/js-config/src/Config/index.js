const getNestedKey = (object, key) => {
    key = key.replace(/\[(\w+)\]/g, '.$1');
    key = key.replace(/^\./, '');

    return key.split('.')
        .reduce((o, k) => { // eslint-disable-line arrow-body-style
            return o ? o[k] : undefined;
        }, object);
};

/**
 * @class Config
 * @description Simple library to get config value from a given object, supports nested values.
 */
class Config {
    constructor() {
        this.get = this.get.bind(this);
        this.list = this.list.bind(this);
    }

    /**
     * @memberOf Config
     * @function init
     * @description Initialize the Config class
     * @param {Object} options (see attributes below)
     * @param {Object} [options.config = {}] config object from which to fetch
     * @param {boolean} [options.upperCase = false] transform the keys in uppercase
     * @example
     * Config.init({
     *   config: configObject,
     *   upperCase: false,
     * })
     */
    init(options = { config: {}, upperCase: false }) {
        if (options && options.config) {
            this.config = options.config;
            this.upperCase = options.upperCase;
        }
    }

    /**
     * @memberOf Config
     * @function get
     * @description Search the given key (supports dot notation),
     * returns the value if found, undefined if not found,
     * false if the value is a false value `('', 0, '0', null, 'null', false, 'false')`
     * @param {String} value the key to search
     * @returns {*}
     * @example
     * Config.get('foo.bar');
     */
    get(value) {
        const falseValues = ['', 0, '0', null, 'null', false, 'false'];

        value = this.upperCase ? value.toUpperCase() : value;
        const confValue = value.indexOf('.') !== -1 ? getNestedKey(this.config, value) : this.config[value];

        if (falseValues.indexOf(confValue) !== -1) {
            return false;
        }
        return confValue;
    }

    /**
     * @memberOf Config
     * @function list
     * @description Returns the entire config object
     * @returns {Config.options.config|{}|*}
     */
    list() {
        return this.config;
    }
}

export default new Config();
