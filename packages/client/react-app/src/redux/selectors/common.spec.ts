import { initialState } from '../store';
import { isElectron, servicePorts } from './common';
import { IReduxStore } from '../store';

beforeEach(() => {
    jest.resetAllMocks();
});
describe('Store selector - common', () => {
    const state = { appState: initialState } as IReduxStore;
    it('should select the right data', () => {
        state.appState.common.isElectron = true;
        const result = isElectron(state);
        expect(result).toBe(true);
    });
    it('should select the right data - 2', () => {
        state.appState.common.servicePorts = { 'some-service': 1111 };
        const result = servicePorts(state);
        expect(result).toEqual({ 'some-service': 1111 });
    });
});
