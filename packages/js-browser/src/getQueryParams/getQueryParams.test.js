import getQueryParams from './index';

describe('Get Query Params function', () => {
    test('getQueryParams - Get no query params', () => {
        const queryParams = getQueryParams();
        expect(queryParams).toEqual({});
    });

    test('getQueryParams - Get more query params after hashbang', () => {
        window.history.pushState({}, 'Test Title', '#!/test.html?aqueryParams=1&anotherQueryParams=2');
        const queryParams = getQueryParams();
        expect(queryParams).toEqual({ aqueryParams: '1', anotherQueryParams: '2' });
    });

    test('getQueryParams - Get single query params after hashbang', () => {
        window.history.pushState({}, 'Test Title', '#!/test.html?aqueryParams=1');
        const queryParams = getQueryParams();
        expect(queryParams).toEqual({ aqueryParams: '1' });
    });
});
