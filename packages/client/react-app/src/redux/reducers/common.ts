import { IReduxStore, IReduxAction } from '../store';
import initialState from '../store/initialState';
import { types } from '../actions/common';

type SliceCommon = IReduxStore['common'];

const common = (state: SliceCommon = initialState.common, action: IReduxAction): SliceCommon => {
    const { type, data } = action;
    switch (type) {
        case types.SET_IS_ELECTRON:
            return {
                ...state,
                isElectron: data.isElectron,
            };
        case types.GET_SERVICE_PORTS_SUCCESS:
            return {
                ...state,
                servicePorts: data.ports,
            };
        default:
            return state;
    }
};

export default common;
