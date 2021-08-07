import { Request, Response } from 'express';
import { asyncMiddleware } from './async-middleware';

describe('asyncMiddleware', () => {
    it('should run the inner function without invoking the next function if it resolves', async () => {
        const func = jest.fn().mockImplementation((req, res, next) => `${req} ${res}`);
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn();
        const wrapped = asyncMiddleware(func);
        await wrapped(req, res, next);
        expect(func).toHaveBeenCalledWith(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });
    it('should run the inner function and invoke the next function if it rejects', async () => {
        const func = jest.fn().mockImplementation(async (req, res, next) => {
            throw Error(`${req} ${res}`);
        });
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn();
        const wrapped = asyncMiddleware(func);
        await wrapped(req, res, next);
        expect(func).toHaveBeenCalledWith(req, res, next);
        expect(next).toHaveBeenCalledWith(Error(`${new Object(req)} ${new Object(res)}`));
    });
});
