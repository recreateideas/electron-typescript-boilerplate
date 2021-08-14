import theme from './theme';
import { initialState } from '../store/initialState';

describe('Store slice - theme', () => {
    it('SOME_UNKNOWN_TYPE - should return the initial state', () => {
        const result = theme(undefined, { type: 'SOME_UNKNOWN_TYPE' });
        expect(result).toEqual(initialState.theme);
    });
    it('SET_THEME_MODE - should return the right data', () => {
        const state = {
            mode: 'light',
        };
        const result = theme(state, { type: 'SET_THEME_MODE', data: { mode: 'dark' } });
        expect(result).toEqual({
            ...state,
            mode: 'dark',
        });
    });
    it('SET_USER_AGENT - should return the right data', () => {
        const result = theme(undefined, {
            type: 'SET_USER_AGENT',
            data: { userAgent: 'some-user-agent' },
        });
        expect(result).toEqual({
            mode: 'light',
            userAgent: 'some-user-agent',
        });
    });
});
