import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router as routes } from './src/routes';
import { ApiError } from './typings';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

app.use('/', (req) => {
    console.log(req.url);
});

//catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next) => {
    const err: ApiError = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500);
    res.send({ error: err });
});

export default app;
