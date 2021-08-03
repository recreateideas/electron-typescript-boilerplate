import { IpcMainEvent } from 'electron';

const getServicePorts = (event: IpcMainEvent): void =>
    event.sender.send('service-ports', {
        ports: { 'data-service': process.env['data-service-port'] },
    });

export { getServicePorts };
