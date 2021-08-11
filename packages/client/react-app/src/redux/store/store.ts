import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const slices = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          trace: true,
          traceLimit: 25,
      })
    : compose;

const middlewares = [applyMiddleware(thunk)];

export const store = createStore(slices, composeEnhancers(...middlewares));
