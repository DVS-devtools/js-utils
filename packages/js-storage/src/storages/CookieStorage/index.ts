import { tryParse } from '../../utils';
import { CookieIterator } from './CookieIterator';
import { StorageInterface, CookieOptions } from '../../interfaces';

/**
 * @ignore
 */
class Cookiestorage implements StorageInterface{
  newCookieIterator(): CookieIterator {
    return new CookieIterator();
  }

  get(key: string): any {
    const iter = this.newCookieIterator();
    let result = iter.next();
    while (result) {
      if (result[0] === key) {
        return tryParse(result[1]);
      }
      result = iter.next();
    }
    return undefined;
  }

  set(key: string, value: any, options?: CookieOptions): void {
    let newCookie = `${key}=${JSON.stringify(value)}`;
    const d = new Date();
    if (options) {
      if (typeof options.exdays !== 'undefined') {
        d.setTime(d.getTime() + (options.exdays * 24 * 60 * 60 * 1000));
        newCookie += `; expires=${d.toUTCString()}`;
      } else if (typeof options.exhours !== 'undefined') {
        d.setTime(d.getTime() + (options.exhours * 60 * 60 * 1000));
        newCookie += `; expires=${d.toUTCString()}`;
      } else if (typeof options.exminutes !== 'undefined') {
        d.setTime(d.getTime() + (options.exminutes * 60 * 1000));
        newCookie += `; expires=${d.toUTCString()}`;
      }

      if (typeof options.path !== 'undefined') {
        newCookie += `; path=${options.path}`;
      }
    }
    document.cookie = newCookie;
  }

  getMultiple(keys?: string[]): any {
    const toReturn: any = {};
    const iter = this.newCookieIterator();
    let result = iter.next();
    while (result) {
      if (!keys || keys.indexOf(result[0]) > -1) {
        toReturn[result[0]] = tryParse(result[1]);
      }
      result = iter.next();
    }
    return toReturn;
  }

  setMultiple(params: {[key: string]: any}, options?: CookieOptions) {
    Object.keys(params).forEach((k) => {
      this.set(k, params[k], options);
    });
  }

  delete(key: string, options: CookieOptions = {}) {
    const opts = Object.assign(options, { exdays: -1 });
    this.set(key, '', opts);
  }
}

export default new Cookiestorage();
