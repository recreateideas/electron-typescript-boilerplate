import { Action, Store } from 'redux';
import { RouterState } from 'connected-react-router';
import { ThemeMode, IServicePorts } from '../../typings';

export type GetStore = () => IReduxStore;
export interface IReduxAction extends Action {
    type: string;
    data?: any;
}

export interface UserAgent {
    isMobile: boolean;
    isDesktop: boolean;
    isAndroid: boolean;
    isIos: boolean;
}

export interface AppState {
    common: {
        isElectron?: boolean;
        servicePorts?: IServicePorts;
    };

    theme: {
        mode: ThemeMode;
        userAgent?: UserAgent;
    };
}
export interface IReduxStore extends Store {
    appState: AppState;
    router: RouterState;
}
