import { Selector } from 'react-redux';
import { IReduxStore } from '../store';

const products: Selector<IReduxStore, object | undefined> = (state) => state.data.products;

const isCheckoutPending: Selector<IReduxStore, boolean | undefined> = (state) =>
    state.data.isCheckoutPending;

export { products, isCheckoutPending };
