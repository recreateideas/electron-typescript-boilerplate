import { ChildProcess } from 'child_process';

export interface IContainerAction {
    composeFile: string;
    action: string;
    serviceName: string;
}

export interface IComposeAction {
    composeFile: string;
    action: string;
    serviceName: string;
    options: string;
}

export interface IRunCommand {
    command: string;
    parse: boolean;
    type?: string;
}

export interface IIndexedChildProcess extends ChildProcess {
    [key: string]: any;
}
