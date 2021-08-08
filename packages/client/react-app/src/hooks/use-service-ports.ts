import { useEffect } from 'react';
import { actions, useDispatch, selectors, useSelector } from '../redux';
import { IServicePorts } from '../typings';
import { defaultServicePorts } from './default-service-ports';

const electron = { ...(window.require ? window.require('electron') : {}) };

const { ipcRenderer } = electron;

const useServicePorts = (): undefined | IServicePorts => {
    const dispatch = useDispatch();
    const {
        common: { getServicePorts, setServicePorts, setIsElectron },
    } = actions;
    const { common: commonSelectors } = selectors;
    const servicePorts: undefined | IServicePorts = useSelector(commonSelectors.servicePorts);
    const isElectron = !!ipcRenderer;
    useEffect(() => {
        dispatch(setIsElectron(isElectron));
        /* istanbul ignore if */
        if (isElectron) {
            dispatch(getServicePorts());
        } else {
            dispatch(setServicePorts(defaultServicePorts));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return servicePorts;
};

export default useServicePorts;
