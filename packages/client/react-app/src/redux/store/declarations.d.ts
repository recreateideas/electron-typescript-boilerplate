import { Action, Store } from 'redux';
import { IServicePorts } from '../../typings';

export type GetStore = () => IReduxStore;
export interface IReduxAction extends Action {
    type: string;
    data?: any;
}

export interface IReduxStore extends Store {
    common: {
        isElectron?: boolean;
        servicePorts?: IServicePorts;
    };
}
