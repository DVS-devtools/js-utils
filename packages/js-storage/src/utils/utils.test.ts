import { tryParse } from './index';

const obj = {key1: 111, key2: 'hello world'};

describe('tryParse', () => {
  it('should parse a stringyfied object', () => {
    const stringyfied = JSON.stringify(obj);
    const res = tryParse(stringyfied);
    expect(typeof res).toEqual('object');
    expect(res).toEqual(obj);
  });

  it('should not parse a string', () => {
    const res = tryParse('hello world');
    expect(typeof res).toEqual('string');
    expect(res).toEqual('hello world');
  });
});