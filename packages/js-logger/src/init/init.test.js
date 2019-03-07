import init from './index';
import Globals from '../globals';

const defaultGlobals = Object.create(Globals);

beforeEach(() => {
    init({
        enable: true,
        emit: console,
        level: defaultGlobals.levels,
    });
});

test('init() set global enable value to true', () => {
    init({ enable: true });
    expect(Globals.enable).toBe(true);
});

test('init() set global enable value to false', () => {
    init({ enable: false });
    expect(Globals.enable).toBe(false);
});

test('init() set global levels value to the passed object', () => {
    const level = {
        log: false,
        debug: false,
        table: true,
        info: true,
        warn: true,
        error: false,
    };

    init({ level });
    expect(Globals.levels).toEqual(level);
});

test('init() set global levels to level equal or higher to the passed', () => {
    init({ level: 'warn' });
    expect(Globals.levels).toEqual({
        log: false,
        debug: false,
        table: false,
        info: false,
        warn: true,
        error: true,
    });
});

test('init() set partially global levels value to the passed object, ignoring unknown levels', () => {
    const level = {
        log: false,
        notALevel: true,
    };
    init({ level });
    expect(Globals.levels).toEqual({
        ...defaultGlobals.levels,
        log: false,
    });
});

test('init() throws error if unknown level is passed', () => {
    expect(() => init({ level: 'foo' }))
        .toThrow(new Error('Logger:: unknown level foo'));
});

test('init() throws error if non boolean value is used in level object', () => {
    expect(() => init({ level: { log: 'bar' } }))
        .toThrow(new Error('Logger:: illegal value type for level log - expected boolean, got string'));
});

test('init() should set the emit object', () => {
    const emitObj = {
        debug() {},
        log() {},
        info() {},
        table() {},
        warn() {},
        error() {},
    };
    init({ emit: emitObj });
    expect(Globals.emit).toBe(emitObj);
});

test('init() should warn if passed emit object does not have all possible log level methods', () => {
    const consoleSpy = jest.spyOn(console, 'warn');
    const emitObj = {
        debug() {},
        log() {},
    };
    init({ emit: emitObj });
    expect(consoleSpy).toHaveBeenCalledWith('The passed emit object does not match the logger schema, some levels may not work');
});
