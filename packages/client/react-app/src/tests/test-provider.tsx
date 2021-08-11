import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { routerMiddleware } from 'connected-react-router';
import { MemoryRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { store as myStore } from '../redux';

export const TestProvider = (defaultState = {}) => {
    const history = createBrowserHistory();
    const mockStore = configureMockStore([thunk, routerMiddleware(history)]);
    const router = {
        push: jest.fn(),
        action: 'POP',
        location: {
            search: '',
            hash: '',
            state: undefined,
            pathname: '/initial-path',
            query: {},
        },
    };
    return {
        mountWithMyStore: (component: ReactElement) => {
            return mount(<Provider store={myStore}>{component}</Provider>);
        },

        mountWithProvider: (component: ReactElement, initialState = {}) => {
            const store = mockStore(Object.assign({}, defaultState, initialState));
            return mount(<Provider store={store}>{component}</Provider>);
        },

        shallowWithStore: (
            componentProvider: (store: MockStoreEnhanced<unknown, {}>) => ReactElement,
            initialState = {}
        ) => {
            const store = mockStore(Object.assign({}, defaultState, initialState));
            return shallow(componentProvider(store));
        },

        mountWithRouterProps: (component: ReactElement, initialState = {}) => {
            const store = mockStore(Object.assign({ appState: initialState }, { router }));
            return mount(
                <MemoryRouter>
                    <Provider store={store}>{component}</Provider>
                </MemoryRouter>
            );
        },

        getStore: (initialState = {}, routerProps = {}) =>
            mockStore(
                Object.assign({ appState: initialState }, { router: { ...router, ...routerProps } })
            ),

        getMyStore: (initialState = {}, routerProps = {}) => myStore,
    };
};
