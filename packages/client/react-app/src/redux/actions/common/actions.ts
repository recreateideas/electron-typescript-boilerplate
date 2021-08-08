import { Dispatch } from 'redux';
import types from './types';
import { IpcRendererEvent } from 'electron';
import { IServicePorts } from '../../../typings';

const electron = { ...(window.require ? window.require('electron') : {}) };

const { ipcRenderer } = electron;

const setIsElectron = (isElectron: boolean) => ({
    type: types.SET_IS_ELECTRON,
    data: { isElectron },
});

interface IGetPorts {
    ports: IServicePorts;
}

const getServicePorts =
    () =>
    (dispatch: Dispatch): void => {
        if (ipcRenderer) {
            dispatch({
                type: types.GET_SERVICE_PORTS_PENDING,
            });
            ipcRenderer.send('get-service-ports');
            ipcRenderer.on('service-ports', (_: IpcRendererEvent, { ports }: IGetPorts) => {
                dispatch({
                    type: types.GET_SERVICE_PORTS_SUCCESS,
                    data: { ports },
                });
            });
        }
    };

export { getServicePorts, setIsElectron };
