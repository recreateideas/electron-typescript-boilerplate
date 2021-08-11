import { RouterState } from 'connected-react-router';
import { routerReducer, router } from './router';

describe('Store slice - routerReducer', () => {
    const defaultRouterState = {
        action: 'POP',
        location: {
            query: {},
            pathname: '/',
            search: '',
            state: undefined,
            hash: '',
        },
    } as RouterState;
    it('SET_ROUTE_PARAMS - should return the right data', () => {
        const state = defaultRouterState;
        const result = routerReducer(state, {
            type: 'SET_ROUTE_PARAMS',
            data: { params: { some: 'data' } },
        });
        expect(result).toEqual({
            ...state,
            params: { some: 'data' },
        });
    });

    it('SET_ROUTE_PARAMS - should use defaultRouterState and return the right data', () => {
        const result = routerReducer(undefined, {
            type: 'SET_ROUTE_PARAMS',
            data: { params: { some: 'data' } },
        });
        expect(result).toEqual({
            ...defaultRouterState,
            params: { some: 'data' },
        });
    });

    it('SET_ROUTE_PARAMS - router - should default state to empty object and return the right data', () => {
        const action = {
            type: 'SET_ROUTE_PARAMS',
            data: { params: { some: 'data' } },
        };
        const result = router(undefined, action);
        expect(result).toEqual(action.data);
    });
});
