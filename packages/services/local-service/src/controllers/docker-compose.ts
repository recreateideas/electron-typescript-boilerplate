import { Request, Response } from 'express';

const action = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { action },
    } = req;
    console.log({ action });
    res.status(200).send({
        action,
    });
};

export { action };
