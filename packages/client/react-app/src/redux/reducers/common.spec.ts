import common from './common';
import { initialState } from '../store';

describe('Store slice - common', () => {
    it('SOME_UNKNOWN_TYPE - should return the initial state', () => {
        const result = common(undefined, { type: 'SOME_UNKNOWN_TYPE' });
        expect(result).toEqual(initialState.common);
    });
    it('SET_IS_ELECTRON - should return the right data', () => {
        const state = {
            servicePorts: { 'some-service': 1111 },
        };
        const result = common(state, { type: 'SET_IS_ELECTRON', data: { isElectron: true } });
        expect(result).toEqual({
            ...state,
            isElectron: true,
        });
    });
    it('SET_SERVICE_PORTS - should return the right data', () => {
        const state = {
            isElectron: true,
        };
        const result = common(state, {
            type: 'SET_SERVICE_PORTS',
            data: { servicePorts: { 'some-service': 1111 } },
        });
        expect(result).toEqual({
            ...state,
            servicePorts: { 'some-service': 1111 },
        });
    });
    it('GET_SERVICE_PORTS_SUCCESS - should return the right data', () => {
        const state = {
            isElectron: true,
        };
        const result = common(state, {
            type: 'GET_SERVICE_PORTS_SUCCESS',
            data: { servicePorts: { 'some-service': 1111 } },
        });
        expect(result).toEqual({
            ...state,
            servicePorts: { 'some-service': 1111 },
        });
    });
});
