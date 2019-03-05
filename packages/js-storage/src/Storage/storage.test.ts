import Storage from './index'; // tslint:disable-line
import { AvailableStorages } from '../interfaces';

const logger = {
  log: () => {},
  info: () => {},
  debug: () => {},
  warn: () => {},
  error: () => {},
};

describe('Storage Pro', () => {
  beforeEach(() => {
    Storage.setLogger(logger, false);
    Storage.setStorage('cookie');
  });
  test('Default storage is cookie', () => {
    const name = 'hello';
    const value = 'world';
    Storage.set(name, value);
    expect(Storage.get(name, { type: 'cookie' })).toEqual(value);
  });

  it('should set the passed options with the init method', () => {
    Storage.init({
      type: 'jsobject',
      logger: console,
      verbose: true,
    });

    expect(Storage['verbose']).toBeTruthy();
    expect(Storage['logger']).toBe(console);
    expect(Storage['selectedStorage']).toBe(Storage['storages'].jsobject);
  });

  it('should set default values if not passed as options props to the init method', () => {
    Storage.init();

    expect(Storage['verbose']).toBeFalsy();
    expect(JSON.stringify(Storage['logger'])).toEqual(JSON.stringify(logger));
    expect(Storage['selectedStorage']).toEqual(Storage['storages'].cookie);
  });

  it('should set verbose to false if verbose is not passed as options prop to init method', () => {
    Storage.init({
      type: 'cookie',
      logger: console,
    });
    expect(Storage['verbose']).toBeFalsy();
  });

  it('should set verbose to false if verbose is not passed as argument to setLogger method', () => {
    Storage.setLogger(console);
    expect(Storage['verbose']).toBeFalsy();
  });

  it('should use cookie as default storage if a non supported storage type is passed to setStorage method', () => {
    Storage.setLogger(logger);
    const spy = jest.spyOn(logger, 'warn');

    Storage.setStorage('unsupportedStorage' as AvailableStorages);
    expect(spy).toHaveBeenCalled();
    expect(Storage['selectedStorage']).toBe(Storage['storages'].cookie);
  });

  it('should set multiple values to the storage with the setMultiple method', () => {
    const obj = { key: 'value', test: 'test' };
    Storage.setLogger(logger, true);
    Storage.setStorage('jsobject');
    const spyLog = jest.spyOn(logger, 'log');
    const spyStorage = jest.spyOn(Storage['storages'].jsobject, 'setMultiple');
    Storage.setMultiple(obj);

    expect((Storage['storages'].jsobject as any).jsObj).toEqual(obj);
    expect(spyLog).toHaveBeenLastCalledWith('Storage', 'setMultiple', obj, {});
    expect(spyStorage).toHaveBeenCalledWith(obj, {});
  });

  it('should get multiple values from the storage with the getMultiple method', () => {
    const obj = { key: 'value', test: 'test' };
    const keys = ['key', 'test'];
    Storage.setLogger(logger, true);
    Storage.setStorage('jsobject');
    const spyLog = jest.spyOn(logger, 'log');
    const spyStorage = jest.spyOn(Storage['storages'].jsobject, 'getMultiple');
    Storage.setMultiple(obj);

    const res = Storage.getMultiple(keys);

    expect(res).toEqual(obj);
    expect(spyLog).toHaveBeenLastCalledWith('Storage', 'getMultiple', keys, res, {});
    expect(spyStorage).toHaveBeenCalledWith(keys, {});
  });

  it('should delete a value from the storage with the delete method', () => {
    Storage.setLogger(logger, false);
    Storage.setStorage('jsobject');
    const spyLog = jest.spyOn(logger, 'log');
    const spyStorage = jest.spyOn(Storage['storages'].jsobject, 'delete');
    Storage.set('test', 'value');
    expect(Storage.get('test')).toEqual('value');
    Storage.delete('test');
    expect(spyLog).toHaveBeenLastCalledWith('Storage', 'delete', 'test', {});
    expect(Storage.get('test')).toBeUndefined();
    expect(spyStorage).toHaveBeenCalledWith('test', {});
  });

  it('should log the get method if verbose', () => {
    Storage.setLogger(logger, true);
    Storage.set('test', 'value');
    const spyLog = jest.spyOn(logger, 'log');
    const res = Storage.get('test');

    expect(res).toEqual('value');
    expect(spyLog).toHaveBeenLastCalledWith('Storage', 'get', 'test', res, {});
  });

  it('should return true if window.localStorage is supported', () => {
    expect(Storage.isLocalStorageSupported()).toBeTruthy();
  });
});
