import { IApiHttpRequest } from '../../typings';

interface IActionParams {
    action: 'up' | 'down' | 'rm';
}

interface IActionBody {
    /** Path to compose file */
    composeFile: string;
    serviceName?: string;
    options?: string;
}

export interface IActionHttpRequest extends IApiHttpRequest {
    body: IActionBody;
    params: IActionParams;
}

export interface IActionHttpResponse {
    result: object;
}
