import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const slices = combineReducers(reducers);

interface DevWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
}

const composeEnhancers = (window as DevWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as DevWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          trace: true,
          traceLimit: 25,
      })
    : compose;

const middlewares = [applyMiddleware(thunk)];

const store = createStore(slices, composeEnhancers(...middlewares));

export default store;
