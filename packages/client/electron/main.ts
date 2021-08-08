import fixPath from 'fix-path';
import path from 'path';
import { ipcRenderer, app, BrowserWindow } from 'electron';
import { killAllServices } from './service-manager';

fixPath();

let mainWindow: BrowserWindow | null;

const debug: boolean = /--debug/.test(process.argv[2]);

const addReactReduxDevTools = (debug: boolean): void => {
    if (debug) {
        const {
            default: installExtension,
            REDUX_DEVTOOLS,
            REACT_DEVELOPER_TOOLS,
        } = require('electron-devtools-installer');
        const options = {
            loadExtensionOptions: { allowFileAccess: true },
        };
        installExtension(REACT_DEVELOPER_TOOLS, options)
            .catch((err: Error): void => console.log(`An error occurred: ${err}`))
            .then((name: string): void => console.log(`Added Extension: ${name}`));
        installExtension(REDUX_DEVTOOLS, options)
            .catch((err: Error): void => console.log(`An error occurred: ${err}`))
            .then((name: string): void => console.log(`Added Extension: ${name}`));
    }
};

const loadMainProcess = (): void => {
    if (ipcRenderer) {
        ipcRenderer.on('stop-server', (event, data) => {
            killAllServices();
        });
    }
};

const createWindow = (): void => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        autoHideMenuBar: true,
        width: 1366,
        height: 768,
        show: false,
    });

    mainWindow.loadFile(path.join(__dirname, './react-app/index.html'));

    if (debug) {
        Object.assign(process.env, { NODE_ENV: 'development' });
        mainWindow.webContents.openDevTools();
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow?.show();
    });

    mainWindow.on('close', () => {
        mainWindow?.webContents.send('stop-server');
    });
    mainWindow.on('closed', () => {
        killAllServices();
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('browser-window-created', (e, window) => {
    window.setMenu(null);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
        ipcRenderer.send('kill-all-services');
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        loadMainProcess();
        createWindow();
    }
});

app.whenReady().then(() => {
    addReactReduxDevTools(debug);
});
