#!/usr/bin/env node
import { AddressInfo } from 'net';
import http, { Server } from 'http';
import app from '../app';
import { SysError } from '../typings';
import { logger } from '../src/modules';

interface IConnection {
    end: () => void;
    destroy: () => void;
}

let connections: IConnection[] = [];

const normalizePort = (val: string | undefined) => {
    if (!val) {
        return;
    }
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
};
const port = normalizePort(process.env['data-service-port']) || 2999;

app.set('port', port);

const server: Server = http.createServer(app);

const onError = (error: SysError) => {
    if (error.syscall !== 'listen') throw error;
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.log(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE':
            logger(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
};

const onListening = () => {
    var addr: string | AddressInfo | null = server.address();
    if (!addr) {
        return;
    }
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    logger('Listening on ' + bind);
};

const shutDown = () => {
    logger('Received kill signal, shutting down gracefully');
    server.close(() => {
        logger('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        logger('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);

    connections.forEach((curr) => curr.end());
    setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
};
logger(`port: ${port}`);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

server.on('connection', (connection) => {
    connections.push(connection);
    connection.on('close', () => (connections = connections.filter((curr) => curr !== connection)));
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
