import { useEffect } from 'react';
import { actions, useDispatch, selectors, useSelector } from '../redux';
import { IServicePorts } from '../typings';

const electron = { ...(window.require ? window.require('electron') : {}) };

const { ipcRenderer } = electron;

const useServicePorts = () => {
    const dispatch = useDispatch();
    const {
        common: { getServicePorts, setIsElectron },
    } = actions;
    const { common: commonSelectors } = selectors;
    const servicePorts: IServicePorts = useSelector(commonSelectors.servicePorts);
    const isElectron = !!ipcRenderer;
    useEffect(() => {
        dispatch(setIsElectron(isElectron));
        if (isElectron) {
            dispatch(getServicePorts());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return isElectron ? servicePorts : {};
};

export default useServicePorts;
