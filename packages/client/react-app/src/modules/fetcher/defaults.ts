import { errorHandler, responseHandler, ErrorHandler, ResponseHandler } from './handlers';

interface IDefaults {
    headers: {
        'Content-Type': 'application/json';
    };
    method: 'GET';
    errorHandler: ErrorHandler;
    responseHandler: ResponseHandler;
}

const defaults = {
    headers: {
        'Content-Type': 'application/json',
    },
    method: 'GET',
    errorHandler,
    responseHandler,
} as IDefaults;

export default defaults;
