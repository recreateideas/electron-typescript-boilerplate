import { Dispatch } from 'redux';
import types from './types';
import { IpcRendererEvent } from 'electron';
import { IServicePorts } from '../../../typings';

const electron = { ...(window.require ? window.require('electron') : {}) };

const { ipcRenderer } = electron;

export const setIsElectron = (isElectron: boolean) => ({
    type: types.SET_IS_ELECTRON,
    data: { isElectron },
});

interface IGetPorts {
    ports: IServicePorts;
}

export const setServicePorts = (servicePorts: IServicePorts) => ({
    type: types.SET_SERVICE_PORTS,
    data: { servicePorts },
});

export const getServicePorts =
    () =>
    (dispatch: Dispatch): void => {
        /* istanbul ignore else */
        if (!ipcRenderer) {
            dispatch({
                type: types.GET_SERVICE_PORTS_SKIPPED,
            });
        } else {
            dispatch({
                type: types.GET_SERVICE_PORTS_PENDING,
            });
            ipcRenderer.send('get-service-ports');
            ipcRenderer.on('service-ports', (_: IpcRendererEvent, { ports }: IGetPorts) => {
                dispatch({
                    type: types.GET_SERVICE_PORTS_SUCCESS,
                    data: { servicePorts: ports },
                });
            });
        }
    };
