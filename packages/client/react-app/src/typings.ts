export interface IServicePorts {
    [serviceName: string]: number;
}

export interface ApiError extends Error {
    status?: number;
}
