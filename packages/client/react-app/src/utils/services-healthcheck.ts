import { AxiosError, AxiosResponse } from 'axios';
import { fetcher, IFetcherConfig } from '../modules';
import { IServicePorts } from '../typings';

export const services = [
    {
        name: 'local-service',
        path: '/health',
        maxRetries: 10,
    },
    // add other services here to perform healthchecks
];

interface IHealthCheck {
    servicePorts: IServicePorts;
    isElectron: boolean;
}
const servicesHealthcheck = async ({
    servicePorts,
    isElectron,
}: IHealthCheck): Promise<boolean> => {
    //@ts-ignore
    window.servicePorts = servicePorts;
    const checks = await Promise.allSettled(
        services.map((service) => {
            const { name, path, maxRetries } = service;
            return new Promise((resolve, reject) => {
                let triesCount = 1;
                const check = setInterval(() => {
                    const url = `http://localhost:${servicePorts[name]}${path}`;
                    const config = {
                        url,
                        method: 'GET',
                        errorHandler: (_: AxiosError) => {
                            if (triesCount === maxRetries) {
                                reject({ [name]: { url, running: true } });
                                clearInterval(check);
                                return;
                            }
                            triesCount++;
                        },
                        responseHandler: (response: AxiosResponse) => {
                            if (response.status === 200) {
                                resolve({ [name]: { url, running: true } });
                                clearInterval(check);
                            }
                            triesCount++;
                        },
                    } as IFetcherConfig;
                    return fetcher(config);
                }, 1000);
            });
        })
    );
    const healthy = Object.values(checks).every((c) => c.status === 'fulfilled');
    return healthy;
};

export default servicesHealthcheck;
