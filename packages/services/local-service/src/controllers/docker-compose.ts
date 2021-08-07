import { Request, Response } from 'express';
import { docker as dockerService } from '../services';
import { IActionHttpResponse } from './docker-compose.d';

const action = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { action },
        body: { composeFile, serviceName = '', options = '' },
    } = req;
    const result = dockerService.composeAction({ composeFile, action, serviceName, options });
    res.status(200).send({
        result,
    } as IActionHttpResponse);
};

export { action };
