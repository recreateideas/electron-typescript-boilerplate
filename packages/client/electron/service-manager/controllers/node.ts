import { IpcMainEvent } from 'electron';
import { services } from '../../package.json';

const getServicePorts = (event: IpcMainEvent): void => {
    const ports = services.reduce((all, service) => {
        const serviceName = service.split('/')[1];
        return {
            ...all,
            [serviceName]: process.env[`${serviceName}-port`],
        };
    }, {});
    event.sender.send('service-ports', {
        ports,
    });
};

export { getServicePorts };
