import './routes';
// const { fixPathForAsarUnpack } = require("electron-util");
import getPort from 'get-port';
import { spawn } from 'child_process';
import path from 'path';
import { logger } from './utils';

const services = ['data-service'];

const _runningServices = services.map(async (serviceName: string) => {
    const port = await getPort({ port: getPort.makeRange(3066, 3100) });
    process.env = {
        ...process.env,
        [`${serviceName}-port`]: `${port}`,
    };
    const servicePath = path.join(__dirname, '../app/services/', serviceName, '/bin/www');
    try {
        const www = require(servicePath);
        const childProcess = await spawn('node', [www], {
            env: process.env,
        });
        childProcess.on('data', (data) => {
            logger(data.toString());
        });
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);
        logger(`childProcess: ${childProcess.pid}, ${servicePath}`);
        return childProcess;
    } catch (e) {
        logger(`[Error]: ${e}`);
    }
});

const killAllServices = () =>
    _runningServices.forEach(async (service) => {
        (await service)?.kill('SIGINT');
    });

export { killAllServices };
