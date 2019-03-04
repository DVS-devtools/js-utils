import CookieStorage from './index'; // tslint:disable-line

/* tslint:disable */
function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
  }
  return null;
}
/* tslint:enable */
const string = 'value';
const obj = { test: '__test__', num: 123 };

describe('Cookie storage', () => {
  it('should set a value to a cookie', () => {
    CookieStorage.set('__test__', string);
    expect(getCookie('__test__')).toEqual(string);
  });

  it('should set a cookie with days expiration', () => {
    CookieStorage.set('__test__', string, { exdays: 2 });
    expect(getCookie('__test__')).toEqual(string);
  });

  it('should set a cookie with hours expiration', () => {
    CookieStorage.set('__test__', string, { exhours: 2 });
    expect(getCookie('__test__')).toEqual(string);
  });

  it('should set a cookie with minutes expiration', () => {
    CookieStorage.set('__test__', string, { exminutes: 2 });
    expect(getCookie('__test__')).toEqual(string);
  });

  it('should set a cookie with path', () => {
    CookieStorage.set('__test__', string, { path: '/example.com/foo/bar' });
    expect(getCookie('__test__')).toEqual(string);
  });

  it('should get a value from cookies', () => {
    document.cookie = 'prova=ciao';
    document.cookie = '__test__=value';
    const res = CookieStorage.get('__test__');
    expect(res).toEqual(string);
  });

  it('should return undefined if no key is found', () => {
    expect(CookieStorage.get('notFound')).toBeUndefined();
  });

  it('should set multiple items into cookies', () => {
    CookieStorage.setMultiple(obj);
    const res = Object.keys(obj).reduce((obj, k) => {
      obj[k] = getCookie(k);
      return obj;
    }, {} as any);
    expect(res).toEqual(obj);
  });

  it('should get multiple items from cookies', () => {
    CookieStorage.setMultiple(obj);
    const res = CookieStorage.getMultiple(['test', 'num']);
    expect(res).toEqual(obj);
  });

  it('should delete an item from cookies', () => {
    CookieStorage.set('__test__', string);
    CookieStorage.delete('__test__');
    expect(getCookie('__test__')).toBeNull();
  });
});
