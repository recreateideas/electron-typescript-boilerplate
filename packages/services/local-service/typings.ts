import { Request } from 'express';
export interface IApiHttpRequest extends Request {
    body: any;
    headers: {
        authorization?: string;
        'content-type'?: 'application/json' | 'application/octet-stream';
    };
    method: 'DELETE' | 'GET' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH';
    params: {};
    path: string;
    query: {};
}
export interface ApiError extends Error {
    status?: number;
}

export interface SysError extends Error {
    syscall?: string;
    code?: string;
}
