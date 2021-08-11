import { Dispatch } from 'redux';
import { LocationDescriptor } from 'history';
import { createMatchSelector, push, RouterRootState } from 'connected-react-router';
import types from './types';

export const setRouteParams =
    (path: string | string[]) => (dispatch: Dispatch, getState: () => RouterRootState<unknown>) => {
        const matchSelector = createMatchSelector(path);
        const { params } = matchSelector(getState()) || {};

        if (params) {
            dispatch({
                type: types.SET_ROUTE_PARAMS,
                data: { params },
            });
        }
    };

export const navigateTo = (path: LocationDescriptor) => (dispatch: Dispatch) => {
    // dispatch(push(`${path}`));
    dispatch({
        type: '@router/CALL_HISTORY_METHOD',
        payload: { method: 'push', args: ['/some/path'] },
    });
};
