import fs from 'fs';
import os from 'os';

const homeDir = os.homedir();

const logger = (string = '') => {
    fs.writeFileSync(
        `${homeDir}/Desktop/log.txt`,
        `${os.EOL}[${new Date().toUTCString()}] ${JSON.stringify(string, null, 4)}`,
        { flag: 'a' }
    );
};

export { logger };
