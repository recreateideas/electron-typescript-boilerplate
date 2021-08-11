import { RouterLocation } from 'connected-react-router';
import { initialState } from '../store';
import { location, query } from './router';

beforeEach(() => {
    jest.resetAllMocks();
});
describe('Store selector - router', () => {
    const state = { ...initialState };
    it('should select the right location', () => {
        state.router.location = { some: 'location' } as unknown as RouterLocation<any>;
        const result = location(state);
        expect(result).toEqual({ some: 'location' });
    });
    it('should select the right query', () => {
        state.router.location = { query: 'some-query' } as unknown as RouterLocation<any>;
        const result = query(state);
        expect(result).toEqual('some-query');
    });
});
