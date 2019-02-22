import Dictionary from './index';

const DICTIONARY = {
    KEY_1: 'Key 1',
    KEY_2: 'Key 2'
};

describe('DICTIONARY INIT', () => {
    it('Dictionary null options', () => {
        Dictionary.init(null);
        expect(Dictionary.parameters).toBeUndefined();
    });
});

describe('DICTIONARY VALUE - missing showKey', () => {
    beforeEach(() => {
        Dictionary.init({ dict: DICTIONARY, showKey: 'missing' });
    });

    it('Dictionary simple test', () => {
        expect(Dictionary.list()).toEqual(DICTIONARY);
    });

    it('Dictionary get test', () => {
        expect(Dictionary.get('KEY_1')).toEqual(DICTIONARY.KEY_1);
    });

    it('Dictionary get 2 test', () => {
        expect(Dictionary.get('KEY_2')).toEqual(DICTIONARY.KEY_2);
    });

    it('Dictionary get missing test', () => {
        expect(Dictionary.get('KEY_MISSING')).toEqual('[[KEY_MISSING]]');
    });
});

describe('DICTIONARY VALUE - all showKey', () => {
    beforeEach(() => {
        Dictionary.init({ dict: DICTIONARY, showKey: 'all' });
    });

    it('Dictionary simple test', () => {
        expect(Dictionary.list()).toEqual(DICTIONARY);
    });

    it('Dictionary get test', () => {
        expect(Dictionary.get('KEY_1')).toEqual('[[KEY_1]]');
    });

    it('Dictionary get 2 test', () => {
        expect(Dictionary.get('KEY_2')).toEqual('[[KEY_2]]');
    });

    it('Dictionary get missing test', () => {
        expect(Dictionary.get('KEY_MISSING')).toEqual('[[KEY_MISSING]]');
    });
});

describe('DICTIONARY VALUE - empty showKey', () => {
    beforeEach(() => {
        Dictionary.init();
    });

    it('Dictionary simple test', () => {
        expect(Dictionary.list()).toEqual({});
    });

    it('Dictionary get test', () => {
        expect(Dictionary.get('KEY_1')).toEqual('[[KEY_1]]');
    });

    it('Dictionary get 2 test', () => {
        expect(Dictionary.get('KEY_2')).toEqual('[[KEY_2]]');
    });

    it('Dictionary get missing test', () => {
        expect(Dictionary.get('KEY_MISSING')).toEqual('[[KEY_MISSING]]');
    });
});

describe('DICTIONARY VALUE - showKey null', () => {
    beforeEach(() => {
        Dictionary.init({ dict: DICTIONARY, showKey: null });
    });

    it('Dictionary get key', () => {
        expect(Dictionary.get('KEY_1')).toEqual(DICTIONARY.KEY_1);
    });

    it('Dictionary get missing key', () => {
        expect(Dictionary.get('test')).toEqual('');
    });
});
