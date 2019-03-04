import ObjectStorage from './index'; // tslint:disable-line

const string = 'value';
const obj = { test: '__test__', num: 123 };

describe('Object storage', () => {
  beforeEach(() => {
    ObjectStorage.jsObj = {};
  });
  it('should set a value to a javascript object', () => {
    ObjectStorage.set('__test__', string);
    expect(Object.keys(ObjectStorage.jsObj)).toContain('__test__');
    expect(ObjectStorage.jsObj.__test__).toEqual(string);
  });

  it('should get a value from a javascript object', () => {
    ObjectStorage.set('__test__', string);
    const res = ObjectStorage.get('__test__');
    expect(res).toEqual(string);
  });

  it('should set multiple items into a javascript object', () => {
    ObjectStorage.setMultiple(obj);
    expect(ObjectStorage.jsObj).toEqual(obj);
  });

  it('should get multiple items from a javascript object', () => {
    ObjectStorage.setMultiple(obj);
    const res = ObjectStorage.getMultiple(['test', 'num']);
    expect(res).toEqual(obj);
  });

  it('should get all items from a javascript object', () => {
    ObjectStorage.setMultiple(obj);
    expect(ObjectStorage.getMultiple()).toEqual(obj);
  });

  it('should delete an item from a javascript object', () => {
    ObjectStorage.set('__test__', string);
    ObjectStorage.delete('__test__');
    expect(Object.keys(ObjectStorage.jsObj)).not.toContain('__test__');
    expect(ObjectStorage.jsObj.__test__).toBeUndefined();
  });
});
