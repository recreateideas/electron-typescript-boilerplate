export interface IApiHttpRequest {
    body?: any;
    headers: {
        authorization?: string;
        'content-type'?: 'application/json' | 'application/octet-stream';
    };
    user?: any;
    method: 'DELETE' | 'GET' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH';
    params?: {};
    path: string;
    query?: {};
}
export interface ApiError extends Error {
    status?: number;
}

export interface SysError extends Error {
    syscall?: string;
    code?: string;
}
