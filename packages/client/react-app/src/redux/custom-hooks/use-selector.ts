import { Selector, useSelector as useReactReduxSelector } from 'react-redux';
import { IReduxStore } from '../store';
import { isEqual } from 'lodash';

type FnSelector = Selector<IReduxStore, any>;

export const useSelector = (fn: FnSelector, rerenderOnChange = true) => {
    const equalityFn = rerenderOnChange ? isEqual : () => true;
    return useReactReduxSelector(fn, equalityFn);
};
