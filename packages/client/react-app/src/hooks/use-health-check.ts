import { useState, useEffect } from 'react';
import { selectors, useSelector } from '../redux';
import { servicesHealthcheck } from '../utils';
import { IServicePorts } from '../typings';

interface IUseHealthChecks {
    servicePorts: IServicePorts | undefined;
}

const useHealthCheck = ({ servicePorts }: IUseHealthChecks): boolean | undefined => {
    const [isHealthy, setIsHealthy] = useState<boolean | undefined>();
    const { common: commonSelectors } = selectors;
    const isElectron = useSelector(commonSelectors.isElectron);
    useEffect(() => {
        if (servicePorts) {
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
