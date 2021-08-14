import { TestProvider } from 'src/tests';
import { setThemeMode, setUserAgent } from './actions';
import { AnyAction } from 'redux';

const { getStore } = TestProvider();

describe('setUserAgent', () => {
    it('should return the right action', () => {
        const store = getStore();
        const userAgent = {
            isMobile: true,
            isDesktop: false,
            isAndroid: false,
            isIos: true,
        };
        store.dispatch(setUserAgent(userAgent) as unknown as AnyAction);
        expect(store.getActions()).toEqual([
            {
                type: 'SET_USER_AGENT',
                data: { userAgent },
            },
        ]);
    });
});

describe('setThemeMode', () => {
    it('should despatch the right action', () => {
        const store = getStore(undefined, { mode: 'light' });
        store.dispatch(setThemeMode('dark') as unknown as AnyAction);
        expect(store.getActions()).toEqual([
            {
                type: 'SET_THEME_MODE',
                data: { mode: 'dark' },
            },
        ]);
    });
});
