import Browser from './index';

describe('Browser test', () => {
    test('Browser - getPrevPage equal to null', () => {
        expect(Browser.getPrevPage()).toBe(null);
    });

    test('Browser - Get prevPage equal to null after shifting 1 page', () => {
        Browser.shiftPage('/test');
        expect(Browser.getPrevPage()).toBe(null);
    });

    test('Browser - Get prevPage equal to /test after shifting first to /test then to /anotherTest', () => {
        Browser.shiftPage('/test');
        Browser.shiftPage('/anotherTest');
        expect(Browser.getPrevPage()).toBe('/test');
    });

    test('Browser - Get none query params', () => {
        const queryParams = Browser.getQueryParams();
        expect(queryParams).toEqual({});
    });

    test('Browser - Get single query params after hashbang', () => {
        window.history.pushState({}, 'Test Title', '#!/test.html?aqueryParams=1');
        const queryParams = Browser.getQueryParams();
        expect(queryParams).toEqual({ aqueryParams: '1' });
    });

    test('Browser - Get more query params after hashbang', () => {
        window.history.pushState({}, 'Test Title', '#!/test.html?aqueryParams=1&anotherQueryParams=2');
        const queryParams = Browser.getQueryParams();
        expect(queryParams).toEqual({ aqueryParams: '1', anotherQueryParams: '2' });
    });
});
