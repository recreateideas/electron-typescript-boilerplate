import { AxiosResponse } from 'axios';
import servicesHealthcheck, { services } from './services-healthcheck';
jest.mock('../modules');
import * as modules from '../modules';

jest.setTimeout(15000);

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
});
describe('servicesHealthcheck', () => {
    it('should call responseHandler as many times as there are services if successful', async () => {
        const handlerSpy = jest.spyOn(modules, 'fetcher').mockImplementation((config) => {
            const response = { status: 200 } as AxiosResponse;
            config.responseHandler?.(response);
            return Promise.resolve(undefined);
        });
        const servicePorts = {
            'local-service': 1111,
        };
        await servicesHealthcheck({ servicePorts, isElectron: false });
        expect(handlerSpy).toHaveBeenCalledTimes(services.length);
    });

    it('should call errorHandler if not successful then retry and invoke responseHandler if successful', async () => {
        const handlerSpy = jest
            .spyOn(modules, 'fetcher')
            .mockImplementationOnce((config) => {
                const err = {
                    code: 'Error',
                    toJSON: () => ({}),
                    config: {},
                    isAxiosError: true,
                    name: 'some-name',
                    message: 'more-meta',
                    response: {
                        status: 500,
                        data: 'data',
                        statusText: 'some-error-status-text',
                        headers: 'more-headers',
                        config: {},
                    },
                };
                config.errorHandler?.(err);
                return Promise.resolve(undefined);
            })
            .mockImplementation((config) => {
                const response = { status: 200 } as AxiosResponse;
                config.responseHandler?.(response);
                return Promise.resolve(undefined);
            });
        const servicePorts = {
            'local-service': 1111,
        };
        await servicesHealthcheck({ servicePorts, isElectron: false });
        expect(handlerSpy).toHaveBeenCalledTimes(2);
    });

    it('should call errorHandler as many times as the value of maxRetries if NOT successful', async () => {
        const errorHandlerSpy = jest.spyOn(modules, 'fetcher').mockImplementation((config) => {
            const err = {
                code: 'Error',
                toJSON: () => ({}),
                config: {},
                isAxiosError: true,
                name: 'some-name',
                message: 'more-meta',
                response: {
                    status: 500,
                    data: 'data',
                    statusText: 'some-error-status-text',
                    headers: 'more-headers',
                    config: {},
                },
            };
            config.errorHandler?.(err);
            return Promise.resolve(undefined);
        });
        const servicePorts = {
            'local-service': 1111,
        };
        await servicesHealthcheck({ servicePorts, isElectron: false });
        expect(errorHandlerSpy).toHaveBeenCalledTimes(services[0].maxRetries);
    });
});
