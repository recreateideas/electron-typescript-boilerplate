import { logger } from './logger';

describe('logger', () => {
    it('should be console', () => {
        expect(logger).toEqual(console.log);
    });
});
