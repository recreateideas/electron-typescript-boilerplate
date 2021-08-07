import { Router } from 'express';
import router from './health';

describe('router', () => {
    it('should be a router function', () => {
        const aRouter = Router();
        expect(typeof router).toBe(typeof aRouter);
    });
});
