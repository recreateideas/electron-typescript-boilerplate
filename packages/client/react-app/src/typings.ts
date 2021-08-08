export interface IServicePorts {
    [serviceName: string]: string;
}

export interface ApiError extends Error {
    status?: number;
}
