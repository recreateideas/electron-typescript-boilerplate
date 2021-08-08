import axios, { AxiosRequestConfig } from 'axios';
import { ErrorHandler, ResponseHandler, IHandlerResponse } from './handlers';
import defaults from './defaults';

export interface IFetcherConfig extends AxiosRequestConfig {
    url: string;
    errorHandler?: ErrorHandler;
    responseHandler?: ResponseHandler;
}

export const fetcher = async (args: IFetcherConfig): Promise<IHandlerResponse | undefined> => {
    const {
        url,
        data,
        method = defaults.method,
        headers = defaults.headers,
        errorHandler = defaults.errorHandler,
        responseHandler = defaults.responseHandler,
    } = args;
    const params = { method, headers, data };
    let response;
    try {
        response = await axios(url, params);
    } catch (err) {
        console.log(err);
        return errorHandler(err);
    }
    console.log(response);
    return responseHandler(response);
};
