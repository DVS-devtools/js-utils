import init from '../init/index';
import Logger from '../index';

/* eslint-disable no-global-assign,no-console */

describe('all logs with enabled: true', () => {
    let consoleSpy = {};
    beforeEach(() => {
        init({ enable: true });
        consoleSpy = {
            debug: jest.spyOn(console, 'debug'),
            info: jest.spyOn(console, 'info'),
            log: jest.spyOn(console, 'log'),
            table: jest.spyOn(console, 'table'),
            warn: jest.spyOn(console, 'warn'),
            error: jest.spyOn(console, 'error'),
        };
    });

    it('Hello debug with enable true', () => {
        Logger.debug('Hello');
        expect(consoleSpy.debug).toHaveBeenCalledTimes(1);
        expect(consoleSpy.debug).toHaveBeenCalledWith(['Hello']);
    });

    it('Hello info with enable true', () => {
        Logger.info('Hello');
        expect(consoleSpy.info).toHaveBeenCalledTimes(1);
        expect(consoleSpy.info).toHaveBeenCalledWith(['Hello']);
    });

    it('Hello log with enable true', () => {
        Logger.log('Hello');
        expect(consoleSpy.log).toHaveBeenCalledTimes(1);
        expect(consoleSpy.log).toHaveBeenCalledWith(['Hello']);
    });

    it('Hello table with enable true', () => {
        Logger.table('Hello');
        expect(consoleSpy.table).toHaveBeenCalledTimes(1);
        expect(consoleSpy.table).toHaveBeenCalledWith(['Hello']);
    });

    it('Hello warn with enable true', () => {
        Logger.warn('Hello');
        expect(consoleSpy.warn).toHaveBeenCalledTimes(1);
        expect(consoleSpy.warn).toHaveBeenCalledWith(['Hello']);
    });

    it('Hello error with enable true', () => {
        Logger.error('Hello');
        expect(consoleSpy.error).toHaveBeenCalledTimes(1);
        expect(consoleSpy.error).toHaveBeenCalledWith(['Hello']);
    });
});

describe('all logs with enabled: false', () => {
    beforeEach(() => {
        init({ enable: false });
        global.console = {
            debug: jest.fn(),
            info: jest.fn(),
            log: jest.fn(),
            table: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
        };
    });

    it('Hello debug with enable false', () => {
        Logger.debug('Hello');
        expect(console.debug).toHaveBeenCalledTimes(0);
    });

    it('Hello info with enable false', () => {
        Logger.info('Hello');
        expect(console.info).toHaveBeenCalledTimes(0);
    });

    it('Hello log with enable false', () => {
        Logger.log('Hello');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    it('Hello table with enable false', () => {
        Logger.table('Hello');
        expect(console.table).toHaveBeenCalledTimes(0);
    });

    it('Hello warn with enable false', () => {
        Logger.warn('Hello');
        expect(console.warn).toHaveBeenCalledTimes(0);
    });

    it('Hello error with enable false', () => {
        Logger.error('Hello');
        expect(console.error).toHaveBeenCalledTimes(0);
    });
});
