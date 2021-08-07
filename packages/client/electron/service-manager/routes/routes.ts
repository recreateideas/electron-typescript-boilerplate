import { ipcMain } from 'electron';
import { node } from '../controllers';

ipcMain.on('get-service-ports', node.getServicePorts);
