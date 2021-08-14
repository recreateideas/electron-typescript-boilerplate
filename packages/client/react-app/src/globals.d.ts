import { Theme } from './App/ui-core/theme';
export declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
        /** enzyme global methods for testing */
        shallow: any;
        render: any;
        mount: any;
        theme: Theme;
    }
}

declare module 'ui-core';
