import { useState, useEffect } from 'react';
import { selectors, useSelector } from '../redux';
import { servicesHealthcheck } from '../utils';
import { IServicePorts } from '../typings';

interface IUseHealthChecks {
    [serviceName: string]: IServicePorts;
}

const useHealthCheck = ({ servicePorts }: IUseHealthChecks): boolean => {
    const [isHealthy, setIsHealthy] = useState(false);
    const { common: commonSelectors } = selectors;
    const isElectron = useSelector(commonSelectors.isElectron);
    useEffect(() => {
        if ((isElectron === true && servicePorts) || isElectron === false) {
            const healthCheck = async () => {
                const result = await servicesHealthcheck({
                    servicePorts,
                    isElectron,
                });
                setIsHealthy(result);
            };
            healthCheck();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [servicePorts, isElectron]);
    return isHealthy;
};

export default useHealthCheck;
