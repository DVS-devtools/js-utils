import init from './index';
import Globals from '../globals';

test('init() set global value to true', () => {
    init({ enable: true });
    expect(Globals.enable).toBe(true);
});

test('init() set global value to false', () => {
    init({ enable: false });
    expect(Globals.enable).toBe(false);
});
