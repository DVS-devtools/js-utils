/**
 * The logger inplementation passed with Storage.setLogger should implements this
 */
export interface Logger {
  log(...params: any): void;
  info(...params: any): void;
  debug(...params: any): void;
  warn(...params: any): void;
  error(...params: any): void;
}

/**
 * Storage adapter interface
 */
export interface StorageInterface {
  get(key: string, options?: StorageOptions): any;
  set(key: string, value: any, options?: StorageOptions): void;
  getMultiple(keys?: string[], options?: StorageOptions): {[key: string]: any};
  setMultiple(params: {[key: string]: any}, options?: StorageOptions): void;
  delete(key: string, options?: StorageOptions): void;
}

/**
 * Available storages
 */
export interface Storages {
  localstorage: StorageInterface;
  cookie: StorageInterface;
  jsobject: StorageInterface;
  [key: string]: any;
}

/**
 * Options to pass to the deprecated method Storage.init
 */
export interface InitOptions {
  type?: AvailableStorages;
  logger?: Logger;
  verbose?: boolean;
}

/**
 * Specific CookieStorage options
 */
export interface CookieOptions {
  exdays?: number;
  exhours?: number;
  exminutes?: number;
  path?: string;
}

/**
 * @ignore
 */
export type StorageOptions = CookieOptions | any;
/**
 * Options to pass to every Storage API,
 * es. pass the 'path' option to specify a "path" attribute for the CookieStorage
 */
export type Options = StorageOptions & {type?: string};

/**
 * Available storages adapters:
 * * localstorage: use the window.localStorage (you should check if is available with Storage.isLocalStorageSupported()
 * * cookie: use document.cookie
 * * jsobject: use a simple Javascript Object that do not persists
 */
export type AvailableStorages = 'localstorage' | 'cookie' | 'jsobject';
