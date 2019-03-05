import init from '../init';
import setDimension from './index';

let mockGA, mockLogger;

beforeEach(() => {
    mockGA = jest.fn();
    mockLogger = {
        log: jest.fn()
    };
});

test('setDimension() without parameters does not calls ga and logger methods', () => {
    const dimSlots = {
        UserLogged: 1,
        UserType: 3
    };

    init({
        enabled: true,
        dimensions: dimSlots,
        ga: mockGA,
        logger: mockLogger
    });
    setDimension();

    expect(mockGA).not.toBeCalledWith('set', `dimension${dimSlots.UserLogged}`, undefined);
    expect(mockLogger.log).not.toBeCalledWith('JsAnalytics', 'set dimension', dimSlots.UserLogged, undefined);
});

test('setDimension() calls correctly ga and logger method', () => {
    const dimSlots = {
        UserLogged: 1,
        UserType: 3
    };
    const dimValue = {
        UserLogged: 'Logged',
        UserType: 'Premium'
    };

    init({
        enabled: true,
        dimensions: dimSlots,
        ga: mockGA,
        logger: mockLogger
    });
    setDimension(dimValue);

    expect(mockGA).toBeCalledWith('set', `dimension${dimSlots.UserLogged}`, dimValue.UserLogged);
    expect(mockLogger.log).toBeCalledWith('JsAnalytics', 'set dimension', dimSlots.UserLogged, dimValue.UserLogged);
    expect(mockGA).toBeCalledWith('set', `dimension${dimSlots.UserType}`, dimValue.UserType);
    expect(mockLogger.log).toBeCalledWith('JsAnalytics', 'set dimension', dimSlots.UserType, dimValue.UserType);
});

test('if initial and current dimensions are different, setDimension() does not calls ga and logger methods', () => {
    const dimSlots = {
        UserLogged: 1
    };
    const dimValue = {
        UserType: 'Premium'
    };

    init({
        enabled: true,
        dimensions: dimSlots,
        ga: mockGA,
        logger: mockLogger
    });
    setDimension(dimValue);

    expect(mockGA).not.toBeCalledWith('set', `dimension${dimSlots.UserLogged}`, undefined);
    expect(mockLogger.log).not.toBeCalledWith('JsAnalytics', 'set dimension', dimSlots.UserLogged, undefined);
});

test('if the library is not enabled, setDimension() calls logger method but not ga method', () => {
    const dimSlots = {
        UserLogged: 1
    };
    const dimValue = {
        UserLogged: 'Logged'
    };

    init({
        enabled: false,
        dimensions: dimSlots,
        ga: mockGA,
        logger: mockLogger
    });
    setDimension(dimValue);

    expect(mockGA).not.toBeCalledWith('set', `dimension${dimSlots.UserLogged}`, dimValue.UserLogged);
    expect(mockLogger.log).toBeCalledWith('JsAnalytics', 'set dimension', dimSlots.UserLogged, dimValue.UserLogged);
});
