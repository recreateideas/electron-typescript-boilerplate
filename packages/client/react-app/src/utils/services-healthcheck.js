import { fetcher } from '../modules';

const services = [
    {
        name: 'data-service',
        path: '/health',
        maxRetries: 10
    }
    // add other services here to perform healthchecks
];
const servicesHealthcheck = async ({ servicePorts, isElectron }) => {
    const checks = await Promise.allSettled(
        services.map(service => {
            const { name, path, maxRetries } = service;
            return new Promise((resolve, reject) => {
                let triesCount = 1;
                const check = setInterval(() => {
                    const url = isElectron
                        ? `http://localhost:${servicePorts[name]}${path}`
                        : path;
                    console.log(servicePorts, url);
                    const config = {
                        url,
                        method: 'GET',
                        errorHandler: error => {
                            if (triesCount === maxRetries) {
                                reject({ [name]: { url, running: true } });
                                clearInterval(check);
                                return;
                            }
                            triesCount++;
                        },
                        responseHandler: response => {
                            if (response.status === 200) {
                                resolve({ [name]: { url, running: true } });
                                clearInterval(check);
                            }
                            triesCount++;
                        }
                    };
                    return fetcher(config);
                }, 1000);
            });
        })
    );
    const healthy = Object.values(checks).every(c => c.status === 'fulfilled');
    return healthy;
};

export default servicesHealthcheck;
