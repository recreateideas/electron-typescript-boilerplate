import { Selector } from 'react-redux';
import { IReduxStore } from '../store';
import { IServicePorts } from '../../typings';

const servicePorts: Selector<IReduxStore, IServicePorts | undefined> = (state) =>
    state.common.servicePorts;

const isElectron: Selector<IReduxStore, boolean | undefined> = (state) => state.common.isElectron;

export { isElectron, servicePorts };
