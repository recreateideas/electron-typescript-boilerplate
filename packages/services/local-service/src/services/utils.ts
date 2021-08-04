import fs from 'fs';
import childProcess from 'child_process';

interface IRunCommand {
    command: string;
    parse: boolean;
    type?: string;
}

const runCommand = ({ command, parse, type = 'execSync' }: IRunCommand): string => {
    const output = childProcess[type](command).toString();
    return parse ? JSON.parse(output) : output;
};

const getFile = (path: string): string => fs.readFileSync(path, 'utf8');

const saveFile = (path: string, content: string): void => {
    fs.writeFileSync(path, content);
};

export { runCommand, getFile, saveFile };
