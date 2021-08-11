import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import reducers from '../reducers';
import { routerReducer as router, history } from '../reducers/router';

const slices = combineReducers({
    appState: combineReducers(reducers),
    router,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          trace: true,
          traceLimit: 25,
      })
    : compose;

const middlewares = [applyMiddleware(thunk, routerMiddleware(history))];

export const store = createStore(slices, composeEnhancers(...middlewares));
export { history };
