import fs from 'fs';
import json from 'js-yaml';
import yaml from 'json-to-pretty-yaml';
import childProcess from 'child_process';
import { getFile, saveFile } from './files';
import { IContainerAction, IComposeAction, IRunCommand, IIndexedChildProcess } from './docker.d';

const _runCommandInChildProcess = ({ command, parse, type = 'execSync' }: IRunCommand): object => {
    const indexdChildProcess = { ...childProcess } as unknown as IIndexedChildProcess;
    const output = indexdChildProcess[type](command); //.toString();
    console.log(output);
    return parse ? JSON.parse(output) : output;
};

const getYamlAsJSON = (paths: string[]): (string | number | object | null | undefined)[] =>
    paths.map((path: string) => json.load(fs.readFileSync(path, 'utf8')));

const saveJsonAsYaml = (path: string, jsonContent: string): void => {
    fs.writeFileSync(path, yaml.stringify(JSON.parse(jsonContent)));
};

const getYamlAsObject = (paths: string[]) =>
    paths.reduce(
        (allYamls, path) => ({
            ...allYamls,
            [path]: json.load(fs.readFileSync(path, 'utf8')),
        }),
        {}
    );

const containerAction = (args: IContainerAction): object => {
    const { composeFile, action, serviceName } = args;
    const command = `docker-compose -f ${composeFile} ${action} ${serviceName}`;
    const result = _runCommandInChildProcess({ command, parse: false });
    return result;
};

const composeAction = (args: IComposeAction): object => {
    const { composeFile, action, serviceName = '', options = '' } = args;
    const command = `docker-compose -f ${composeFile} ${action} ${serviceName} ${options}`.trim();
    const result = _runCommandInChildProcess({ command, parse: false, type: 'exec' });
    return result;
};

export {
    getFile,
    getYamlAsJSON,
    getYamlAsObject,
    saveJsonAsYaml,
    saveFile,
    containerAction,
    composeAction,
};
