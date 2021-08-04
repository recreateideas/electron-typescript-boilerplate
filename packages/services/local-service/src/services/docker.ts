import fs from 'fs';
import json from 'js-yaml';
import yaml from 'json-to-pretty-yaml';
import { runCommand, getFile, saveFile } from './utils';

interface IContainerAction {
    composeFile: string;
    action: string;
    serviceName: string;
}

interface IComposeAction {
    composeFile: string;
    action: string;
    serviceName: string;
    options: string;
}

const getYamlAsJSON = (paths: string[]): string[] =>
    paths.map((path) => json.safeLoad(fs.readFileSync(path, 'utf8')));

const saveJsonAsYaml = (path: string, jsonContent: string): void => {
    fs.writeFileSync(path, yaml.stringify(JSON.parse(jsonContent)));
};

const getYamlAsObject = (paths: string[]) =>
    paths.reduce(
        (allYamls, path) => ({
            ...allYamls,
            [path]: json.safeLoad(fs.readFileSync(path, 'utf8')),
        }),
        {}
    );

const containerAction = (args: IContainerAction): string => {
    const { composeFile, action, serviceName } = args;
    const command = `docker-compose -f ${composeFile} ${action} ${serviceName}`;
    const result = runCommand({ command, parse: false });
    return result;
};

const composeAction = (args: IComposeAction): string => {
    const { composeFile, action, serviceName = '', options = '' } = args;
    const command = `docker-compose -f ${composeFile} ${action} ${serviceName} ${options}`.trim();
    const result = runCommand({ command, parse: false, type: 'exec' });
    return result;
};

module.exports = {
    getFile,
    getYamlAsJSON,
    getYamlAsObject,
    saveJsonAsYaml,
    saveFile,
    containerAction,
    composeAction,
};
