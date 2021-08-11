import { RouterLocation } from 'connected-react-router';
import { Selector } from 'react-redux';
import { IReduxStore } from '../store';

const location: Selector<IReduxStore, RouterLocation<any>> = (state) => state.router.location;
const query: Selector<IReduxStore, Record<string, string>> = (state) =>
    state.router.location?.query;

export { location, query };
