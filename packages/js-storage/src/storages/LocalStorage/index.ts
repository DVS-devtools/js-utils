import { tryParse } from '../../utils';
import { StorageInterface } from '../../interfaces';

/**
 * @ignore
 */
class LocalStorage implements StorageInterface {
  get(key: string): any {
    return tryParse(window.localStorage.getItem(key) || undefined);
  }

  set(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getMultiple(keys?: string[]): {[key: string]: any} {
    if (keys) {
      return keys.reduce((obj, k) => {
        obj[k] = this.get(k);
        return obj;
      }, {} as any);
    }
    return Array.from(Array(window.localStorage.length), (x, i) => i).reduce((obj, k) => {
      const key = window.localStorage.key(k) as string;
      obj[key] = this.get(key);
      return obj;
    }, {} as any);
  }

  setMultiple(params: {[key: string]: any}): void {
    Object.keys(params).forEach((k) => {
      this.set(k, params[k]);
    });
  }

  delete(key: string): void {
    window.localStorage.removeItem(key);
  }
}

export default new LocalStorage();
