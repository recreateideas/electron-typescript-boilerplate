import { initialState } from '../store';
import { isElectron, servicePorts } from './common';

beforeEach(() => {
    jest.resetAllMocks();
});
describe('Store selector - common', () => {
    const state = { ...initialState };
    it('should select the right data', () => {
        state.common.isElectron = true;
        const result = isElectron(state);
        expect(result).toBe(true);
    });
    it('should select the right data', () => {
        state.common.servicePorts = { 'some-service': 1111 };
        const result = servicePorts(state);
        expect(result).toEqual({ 'some-service': 1111 });
    });
});
