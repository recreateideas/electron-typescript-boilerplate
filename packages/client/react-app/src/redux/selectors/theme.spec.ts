import { initialState } from '../store';
import { mode, isDarkMode, userAgent } from './theme';
import { IReduxStore } from '../store';

beforeEach(() => {
    jest.resetAllMocks();
});
describe('Store selector - theme', () => {
    const state = { appState: initialState } as IReduxStore;
    it('should select the right value - 1', () => {
        state.appState.theme.mode = 'light';
        const result = mode(state);
        expect(result).toBe('light');
    });

    it('should select the right value - 2', () => {
        state.appState.theme.mode = 'light';
        const result = isDarkMode(state);
        expect(result).toBe(false);
    });
    it('should select the right value - 3', () => {
        state.appState.theme.userAgent = {
            isMobile: true,
            isDesktop: false,
            isAndroid: true,
            isIos: false,
        };
        const result = userAgent(state);
        expect(result).toEqual({
            isMobile: true,
            isDesktop: false,
            isAndroid: true,
            isIos: false,
        });
    });
});
