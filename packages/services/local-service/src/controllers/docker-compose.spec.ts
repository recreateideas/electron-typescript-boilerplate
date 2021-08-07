import { Response } from 'express';
import { IActionHttpRequest } from './docker-compose.d';
import * as dockerService from '../services/docker';
import * as docker from './docker-compose';

const req = {
    params: 'up',
    body: {},
} as any | IActionHttpRequest;

const res = {
    status: jest.fn().mockImplementation(() => ({
        send: jest.fn(),
        json: jest.fn(),
    })),
    send: jest.fn(),
    json: jest.fn(),
} as any | Response;
describe('healthCheck', () => {
    it('should call composeAction once', async () => {
        Object.defineProperty(dockerService, 'composeAction', {
            value: jest.fn(),
        });
        await docker.action(req, res);
        expect(dockerService.composeAction).toHaveBeenCalledTimes(1);
    });
});
