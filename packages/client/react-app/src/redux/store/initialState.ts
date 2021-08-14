import { AppState } from './models.d';

export const initialState = {
    common: {},
    theme: {
        mode: 'light',
        userAgent: undefined,
    },
} as AppState;
