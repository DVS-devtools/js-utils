import { StorageInterface } from '../../interfaces';

/**
 * @ignore
 */
export type JsObjEntry = any;

/**
 * @ignore
 */
export interface JsObj {
  [key: string]: JsObjEntry;
}

/**
 * @ignore
 */
class ObjectStorage implements StorageInterface {
  jsObj: JsObj = {};

  get(key: string): JsObjEntry {
    return this.jsObj[key];
  }

  set(key: string, value: any): void {
    this.jsObj[key] = value;
  }

  getMultiple(keys?: string[]): JsObj | Partial<JsObj> {
    if (keys) {
      return keys.reduce((obj, k) => {
        obj[k] = this.get(k);
        return obj;
      }, {} as JsObj);
    }
    return this.jsObj;
  }

  setMultiple(params: {[key: string]: any}): void {
    Object.keys(params).forEach((k) => {
      this.set(k, params[k]);
    });
  }

  delete(key: string): void {
    delete this.jsObj[key];
  }
}

export default new ObjectStorage();
