import init from '../init/index';
import Logger from '../index';

/* eslint-disable no-global-assign */

describe('all logs with enabled: true', () => {
    beforeEach(() => {
        init({ enable: true });

        console = {
            debug: jest.fn(),
            log: jest.fn(),
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn()
        };
    });

    it('Hello debug with enable true', () => {
        Logger.debug('Hello');
        expect(console.debug).toHaveBeenCalledTimes(1);
        expect(console.debug).toHaveBeenCalledWith(['Hello']);
    });

    it('Hello info with enable true', () => {
        Logger.info('Hello');
        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenCalledWith(['Hello']);
    });

    it('Hello log with enable true', () => {
        Logger.log('Hello');
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(['Hello']);
    });

    it('Hello warn with enable true', () => {
        Logger.warn('Hello');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(['Hello']);
    });

    it('Hello error with enable true', () => {
        Logger.error('Hello');
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(['Hello']);
    });
});

describe('all logs with enabled: false', () => {
    beforeEach(() => {
        init({ enable: false });

        console = {
            debug: jest.fn(),
            log: jest.fn(),
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn()
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

    it('Hello warn with enable false', () => {
        Logger.warn('Hello');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(['Hello']);
    });

    it('Hello error with enable false', () => {
        Logger.error('Hello');
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(['Hello']);
    });
});
