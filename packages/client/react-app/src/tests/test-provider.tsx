import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';

export const TestProvider = (defaultState = {}) => {
    const mockStore = configureMockStore([thunk]);

    return {
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
            const history = {
                push: jest.fn(),
                location: {
                    search: '',
                    pathname: '/initial-path',
                    query: {},
                },
            };

            const store = mockStore(Object.assign({}, history, initialState));

            return mount(
                <MemoryRouter>
                    <Provider store={store}>{component}</Provider>
                </MemoryRouter>
            );
        },
    };
};
