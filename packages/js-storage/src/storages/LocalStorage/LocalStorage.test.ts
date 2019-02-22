import LocalStorage from './index'; // tslint:disable-line

const string = 'value';
const obj: {[key: string]: any} = { test: '__test__', num: 123 };

function get(key: string) {
  return JSON.parse(window.localStorage.getItem(key) as any);
}

describe('Local storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  it('should set a value to localStorage', () => {
    LocalStorage.set('__test__', string);
    expect(get('__test__')).toEqual(string);
  });

  it('should get a value from localStorage', () => {
    window.localStorage.setItem('__test__', string);
    expect(LocalStorage.get('__test__')).toEqual(string);
  });

  it('should return undefined if no key is found', () => {
    expect(LocalStorage.get('notFound')).toBeUndefined();
  });

  it('should set multiple items into localStorage', () => {
    LocalStorage.setMultiple(obj);
    const res = Object.keys(obj).reduce((obj, k) => {
      obj[k] = get(k);
      return obj;
    }, {} as any);
    expect(res).toEqual(obj);
  });

  it('should get multiple items from localStorage', () => {
    Object.keys(obj).forEach(k => window.localStorage.setItem(k, obj[k]));
    const res = LocalStorage.getMultiple(['test', 'num']);
    expect(res).toEqual(obj);
  });

  it('should return the entire localStorage storage', () => {
    Object.keys(obj).forEach(k => window.localStorage.setItem(k, obj[k]));
    expect(LocalStorage.getMultiple()).toEqual(obj);
  });

  it('should delete an item from localStorage', () => {
    LocalStorage.set('__test__', string);
    LocalStorage.delete('__test__');
    expect(Object.keys(window.localStorage)).not.toContain('__test__');
    expect(get('__test__')).toBeNull();
  });
});
