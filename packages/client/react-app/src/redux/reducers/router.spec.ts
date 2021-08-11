import { RouterState } from 'connected-react-router';
import { routerReducer as router } from './router';
import initialState from '../store/initialState';

describe('Store slice - router', () => {
    const baseState = {
        action: 'POP',
        location: {
            query: { a: 'b' },
            pathname: '',
            search: '',
            state: '',
            hash: '',
        },
    } as RouterState;
    it('SET_ROUTE_PARAMS - should return the right data', () => {
        const state = {
            ...baseState,
        };
        const result = router(state, {
            type: 'SET_ROUTE_PARAMS',
            data: { params: { some: 'data' } },
        });
        expect(result).toEqual({
            ...state,
            params: { some: 'data' },
        });
    });
});
