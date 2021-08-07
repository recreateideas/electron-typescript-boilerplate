import fs from 'fs';

const getFile = (path: string): string => fs.readFileSync(path, 'utf8');

const saveFile = (path: string, content: string): void => {
    fs.writeFileSync(path, content);
};

export { getFile, saveFile };
