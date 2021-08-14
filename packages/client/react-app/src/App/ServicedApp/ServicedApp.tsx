import { ReactElement } from 'react';
import { useHealthCheck, useServicePorts } from '../../hooks';
import { Loader } from '../ui-core';
import { App } from '../App';

export const ServicedApp = (): ReactElement => {
    const servicePorts = useServicePorts();
    const isHealthy = useHealthCheck({ servicePorts });
    const isChecking = isHealthy === undefined;
    return (
        <div id="app">
            {isHealthy ? (
                <App />
            ) : !servicePorts ? (
                <Loader
                    {...{
                        className: 'setting-up',
                        color: 'green',
                        message: 'setting up services...',
                    }}
                />
            ) : isChecking ? (
                <Loader
                    {...{
                        className: 'checking',
                        color: '#6b5b95',
                        message: 'checking services...',
                    }}
                />
            ) : (
                <Loader
                    {...{
                        className: 'not-responding',
                        color: 'red',
                        freeze: true,
                        message: 'Services are not responding. Cmd + R to retry.',
                    }}
                />
            )}
        </div>
    );
};
