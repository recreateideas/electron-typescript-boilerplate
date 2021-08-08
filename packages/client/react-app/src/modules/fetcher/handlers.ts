import { AxiosError, AxiosResponse } from 'axios';

interface IHandlerResponse {
    status: number | void;
    data: string | void;
}

export type ErrorHandler = (err: AxiosError | unknown) => IHandlerResponse;

export type ResponseHandler = (err: AxiosResponse) => IHandlerResponse;

export type Error = AxiosError;

const errorHandler = (err: AxiosError): IHandlerResponse => {
    return {
        status: err.response?.status,
        data: err.response?.data,
    };
};

const responseHandler = (res: AxiosResponse): IHandlerResponse => {
    return {
        status: res.status,
        data: res.data,
    };
};

export { errorHandler, responseHandler };
