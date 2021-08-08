import { errorHandler, responseHandler } from './handlers';

describe('responseHandler', () => {
    it('should return the formatted response', () => {
        const res = {
            status: 1111,
            data: 'data',
            statusText: 'some-status-text',
            headers: 'more-headers',
            config: {},
        };
        const result = responseHandler(res);
        expect(result).toEqual({
            status: 1111,
            data: 'data',
        });
    });
});

describe('errorHandler', () => {
    it('should return the formatted response', () => {
        const err = {
            code: 'Error',
            toJSON: () => ({}),
            config: {},
            isAxiosError: true,
            name: 'some-name',
            message: 'more-meta',
            response: {
                status: 500,
                data: 'data',
                statusText: 'some-error-status-text',
                headers: 'more-headers',
                config: {},
            },
        };
        const result = errorHandler(err);
        expect(result).toEqual({
            status: 500,
            data: 'data',
        });
    });
});
