import { Request, Response } from 'express';

const healthCheck = async (_req: Request, res: Response): Promise<void> => {
    console.debug('HEALTH');
    res.status(200).send({
        health: 'ok',
    });
};

export { healthCheck };
