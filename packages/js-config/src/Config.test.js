import Config from './index';

const CONFIG = {
    VALUE: 100,
    STRING_VALUE: 'value',
    OBJECT_VALUE: {
        OBJ_NESTED: 'nested',
        OBJ_KEY: 'value'
    },
    ARRAY_VALUE: [1, 2, 3],
    FALSE: false,
    STRING_FALSE: 'false',
    EMPTY_STRING: '',
    FALSE_ZERO: 0,
    FALSE_STRING_ZERO: '0',
    NULL: null,
    STRING_NULL: 'null'
};

describe('CONFIG INIT', () => {
    it('CONFIG - null options', () => {
        Config.init(null);
        expect(Config.config).toBeUndefined();
        expect(Config.upperCase).toBeUndefined();
    });

    it('CONFIG - no options', () => {
        Config.init();
        expect(Config.config).toEqual({});
        expect(Config.upperCase).toBe(false);
    });
});

describe('CONFIG VALUE', () => {

    beforeEach(() => {
        Config.init({ config: CONFIG, upperCase: false });
    });

    it('CONFIG - Simple Config test', () => {
        expect(true).toEqual(true);
        expect(Config).toBeDefined();
    });

    it('CONFIG - list test', () => {
        expect(Config.list()).toEqual(CONFIG);
    });

    it('CONFIG - Get value', () => {
        expect(Config.get('VALUE')).toEqual(100);
    });

    it('CONFIG - Get string value', () => {
        expect(Config.get('STRING_VALUE')).toEqual('value');
    });

    it('CONFIG - Get object value', () => {
        expect(Config.get('OBJECT_VALUE')).toEqual({
            OBJ_NESTED: 'nested',
            OBJ_KEY: 'value'
        });
    });

    it('CONFIG - Get nested object value', () => {
        expect(Config.get('OBJECT_VALUE.OBJ_NESTED')).toEqual('nested');
    });

    it('CONFIG - Get array value', () => {
        expect(Config.get('ARRAY_VALUE')).toEqual([1, 2, 3]);
    });
});

describe('CONFIG FALSE VALUE', () => {

    beforeEach(() => {
        Config.init({ config: CONFIG, upperCase: false });
    });

    it('CONFIG - Get false value', () => {
        expect(Config.get('FALSE')).toEqual(false);
    });

    it('CONFIG - Get false string', () => {
        expect(Config.get('STRING_FALSE')).toEqual(false);
    });

    it('CONFIG - Get false value', () => {
        expect(Config.get('FALSE')).toEqual(false);
    });

    it('CONFIG - Get false string', () => {
        expect(Config.get('STRING_FALSE')).toEqual(false);
    });

    it('CONFIG - Get no value', () => {
        expect(Config.get('EMPTY')).toEqual(undefined);
    });

    it('CONFIG - Get empty string string', () => {
        expect(Config.get('EMPTY_STRING')).toEqual(false);
    });

    it('CONFIG - Get false string zero string', () => {
        expect(Config.get('FALSE_ZERO')).toEqual(false);
    });

    it('CONFIG - Get false zero', () => {
        expect(Config.get('FALSE_STRING_ZERO')).toEqual(false);
    });

    it('CONFIG - Get false null', () => {
        expect(Config.get('NULL')).toEqual(false);
    });

    it('CONFIG - Get false null string', () => {
        expect(Config.get('STRING_NULL')).toEqual(false);
    });
});

describe('CONFIG UPPERCASE - uppercase test', () => {

    beforeEach(() => {
        Config.init({ config: CONFIG, upperCase: true });
    });

    it('CONFIG UPPERCASE - Simple Config test', () => {
        expect(true).toEqual(true);
        expect(Config).toBeDefined();
    });

    it('CONFIG UPPERCASE - list test', () => {
        expect(Config.list()).toEqual(CONFIG);
    });

    it('CONFIG UPPERCASE - Get value', () => {
        expect(Config.get('value')).toEqual(100);
    });

    it('CONFIG UPPERCASE - Get string value', () => {
        expect(Config.get('string_value')).toEqual('value');
    });

    it('CONFIG UPPERCASE - Get object value', () => {
        expect(Config.get('object_value')).toEqual({
            OBJ_NESTED: 'nested',
            OBJ_KEY: 'value'
        });
    });

    it('CONFIG UPPERCASE - Get nested object value', () => {
        expect(Config.get('object_value.obj_nested')).toEqual('nested');
    });

    it('CONFIG UPPERCASE - Get array value', () => {
        expect(Config.get('array_value')).toEqual([1, 2, 3]);
    });

    it('CONFIG UPPERCASE - Get uppercase value', () => {
        expect(Config.get('ARRAY_VALUE')).toEqual([1, 2, 3]);
    });
});
