import { types } from '../actions/router';
import { RouterState } from 'connected-react-router';
import { IReduxAction } from '../store';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const connectedReducer = connectRouter(history);

const router = (state = {}, action: IReduxAction) => {
    const { type, data } = action;
    switch (type) {
        case types.SET_ROUTE_PARAMS:
            return {
                ...state,
                ...data,
            };
        default:
            return state;
    }
};

const routerReducer = (state: RouterState | undefined, action: IReduxAction) => {
    let currentState = connectedReducer(state, action);
    return router(currentState, action);
};

export { routerReducer, history };
