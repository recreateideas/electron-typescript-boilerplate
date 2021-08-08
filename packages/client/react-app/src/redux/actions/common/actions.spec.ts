import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
jest.mock('electron');
import electron from 'electron';
import { setIsElectron, setServicePorts, getServicePorts } from './actions';
import types from './types';
import { AnyAction } from 'redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('setIsElectron', () => {
    it('should return the right action', () => {
        const result = setIsElectron(true);
        expect(result).toEqual({ type: types.SET_IS_ELECTRON, data: { isElectron: true } });
    });
});

describe('setServicePorts', () => {
    const mockPorts = {
        'some-service': 11,
    };
    it('should return the right action', () => {
        const result = setServicePorts(mockPorts);
        expect(result).toEqual({ type: types.SET_SERVICE_PORTS, data: { ports: mockPorts } });
    });
});

describe('getServicePorts', () => {
    it('should despatch the right action', () => {
        const store = mockStore({});
        store.dispatch(getServicePorts() as unknown as AnyAction);
        expect(store.getActions()).toEqual([
            {
                type: 'GET_SERVICE_PORTS_SKIPPED',
            },
        ]);
    });
});
