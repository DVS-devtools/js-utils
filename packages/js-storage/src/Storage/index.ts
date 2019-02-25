import { LocalStorage, CookieStorage, ObjectStorage } from '../storages';
import { AvailableStorages, InitOptions, Logger, Options, StorageInterface, Storages } from '../interfaces';

/**
 * Storage is the library to save and get data in different ways.
 */
class Storage {
  /**
   * Object to log the Storage operations, should match the window.console API
   */
  private logger: Logger = {
    debug: () => {},
    log: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
  };

  /**
   * If true, logs also the get operations
   */
  private verbose: boolean = false;

  /**
   * The default storage to use
   */
  private selectedStorage: StorageInterface;

  /**
   * The available storages
   */
  private storages: Storages = {
    localstorage: LocalStorage,
    cookie: CookieStorage,
    jsobject: ObjectStorage,
  };

  /**
   * @ignore
   */
  constructor() {
    this.selectedStorage = this.storages.cookie;
  }

  /**
   * @deprecated Use setLogger and setStorage directly
   * Init storage module
   * @param {Object} [options={}]
   * @param {String} [options.type='cookie'] Define the default storage you want to use.
   * Must be one of the supported storages:
   * * localstorage
   * * cookie
   * * jsobject
   * @param {Object} options.logger any object that follow the window.console interface:
   * must have this methods:
   * * log
   * * debug
   * * info
   * * warn
   * * error
   * @param {Boolean} [options.verbose=false] If true the logger is called also on get methods
   * @example
   * <br>
   * <pre>
   * Storage.init({
   *     type: 'jsobject',
   *     logger: console,
   *     verbose: true
   * });
   * </pre>
   */
  init(options: InitOptions = {}): void {
    if (options.type) {
      this.setStorage(options.type);
    }
    if (options.logger) {
      this.setLogger(options.logger, options.verbose || false);
    }
    this.logger.log('Storage', 'init', options);
  }

  /**
   * Set the logger object, should implements an interface similar to window.console
   * @param {Object} logger
   * @param {Boolean} verbose
   * @example
   * <br><pre>
   * Storage.setLogger(console)
   * Storage.setLogger(console, true) // verbose
   * </pre>
   */
  setLogger(logger: Logger, verbose: boolean = false): void  {
    this.logger = logger;
    this.verbose = verbose;
  }

  /**
   * Set the default storage to use
   * Available storages:
   * * localStorage
   * * cookie
   * * js object
   * Can be overridden for every call with the "type" param
   * @param {String} storage
   * @example
   * <br><pre>
   * Storage.setStorage('cookie')
   * </pre>
   */
  setStorage(storage: AvailableStorages): void {
    if (this.storages.hasOwnProperty(storage)) {
      this.selectedStorage = this.storages[storage];
    } else {
      this.logger.warn(`Storage ${storage} not supported, fallback to cookie storage`);
      this.selectedStorage = this.storages.cookie;
    }
  }

  /**
   * Get the storage to use
   * @ignore
   * @param options
   */
  getStorage(options: any): StorageInterface {
    if (options && options.type) {
      return this.storages[options.type];
    }
    return this.selectedStorage;
  }

  /**
   * Set a value in the storage by the given key
   * @param {String} key key to identify the data
   * @param {*} value the data to store
   * @param {Object} options
   * @param {string} [options.type=null] storage type to use,
   * use only if we want to save data
   * to a different storage than the default (set with setStorage)
   * @param {Integer} [options.exdays=null] expirations days of stored data
   * (only for cookie storage)
   * @param {Integer} [options.exhours=null] expirations hours of stored data
   * (only for cookie storage)
   * @param {Integer} [options.exminutes=null] expirations minutes of stored data
   * (only for cookie storage)
   * @example
   * <br><pre>
   * // Storage saves variable in default type storage (defined in init method)
   * Storage.set('country', 'it');
   *
   * // Storage saves variable as cookie
   * Storage.set('isLogged', true, {type: 'cookie'});
   * </pre>
   */
  set(key: string, value: any, options: Options = {}): void {
    this.getStorage(options).set(key, value, options);
    this.logger.log('Storage', 'set', key, value, options);
  }

  /**
   * Set multiple values in the storage
   * @param {Object} params key values pair to save
   * @param {Object} options
   * @param {string} [options.type=null] storage type to use,
   * use only if we want to save data
   * to a different storage than the default (set with setStorage)
   * @param {Integer} [options.exdays=null] expirations days of stored data
   * (only for cookie storage)
   * @param {Integer} [options.exhours=null] expirations hours of stored data
   * (only for cookie storage)
   * @param {Integer} [options.exminutes=null] expirations minutes of stored data
   * (only for cookie storage)
   * @example
   * <br><pre>
   * // Storage saves variables in default type storage (defined in init method)
   * Storage.setMultiple({country: 'it', isLogged: true});
   *
   * // Storage saves variables as cookies
   * Storage.setMultiple({country: 'it', isLogged: true}, {type: 'cookie'});
   * </pre>
   */
  setMultiple(params: {[key: string]: any}, options: Options = {}): void {
    this.getStorage(options).setMultiple(params, options);
    this.logger.log('Storage', 'setMultiple', params, options);
  }

  /**
   * Get a value from the storage by the given key
   * @param {String} key to identify the data
   * @param {Object} options
   * @param {string} [options.type=null] storage type to use,
   * use only if we want to save data
   * to a different storage than the default (set with setStorage)
   * @return {*}
   * @example
   * <br><pre>
   * // Storage loads variable from default type storage (defined in init method)
   * Storage.get('country', 'it');
   *
   * // Storage loads variable as cookie
   * Storage.get('isLogged', {type: 'cookie'});
   * </pre>
   */
  get(key: string, options: Options = {}): any {
    const result = this.getStorage(options).get(key, options);

    if (this.verbose) {
      this.logger.log('Storage', 'get', key, result, options);
    }

    return result;
  }

  /**
   * Get multiple values from the storage
   * @param {Array} keys array of keys to identify the data
   * @param {Object} options
   * @param {string} [options.type=null] storage type to use,
   * use only if we want to save data
   * to a different storage than the default (set with setStorage)
   * @return {*|{}}
   * @example
   * <br><pre>
   * // Storage loads variables from default type storage (defined in init method)
   * Storage.getMultiple(['country', 'isLogged']);
   * // it returns {country: 'it', isLogged: true}
   *
   * // Storage loads variables as cookie
   * Storage.getMultiple(['country', 'isLogged'], {type: 'cookie'});
   * // it returns {country: 'it', isLogged: true}
   * </pre>
   */
  getMultiple(keys: string[], options: Options = {}): {[key: string]: any} {
    const result = this.getStorage(options).getMultiple(keys, options);

    if (this.verbose) {
      this.logger.log('Storage', 'getMultiple', keys, result, options);
    }

    return result;
  }

  /**
   * Delete a stored value
   * @param {String} key key to identify the value
   * @param {Object} options
   * @param {string} [options.type=null] storage type to use,
   * use only if we want to save data
   * to a different storage than the default (set with setStorage)
   * @example
   * <br><pre>
   * // Storage delete variable from default type storage (defined in init method)
   * Storage.delete('country');
   *
   * // Storage delete variable as cookie
   * Storage.delete('country', {type: 'cookie'});
   * </pre>
   */
  delete(key: string, options: Options = {}): void {
    this.getStorage(options).delete(key, options);
    this.logger.log('Storage', 'delete', key, options);
  }

  /**
   * Check if the browser supports the local storage
   * @return {boolean} **true** if supported, else **false**
   * @example
   * <br><pre>
   *  if(Storage.isLocalStorageSupported()) {
   *       // can store a localStorage key
   *   } else {
   *       alert('local storage is not supported');
   *   }
   * </pre>
   */
  isLocalStorageSupported(): boolean {
    const name = 'test';
    try {
      window.localStorage.setItem(name, name);
      window.localStorage.getItem(name);
      window.localStorage.removeItem(name);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default new Storage();
