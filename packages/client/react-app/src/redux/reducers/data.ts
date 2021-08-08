import { IReduxAction } from '../store';
import initialState from '../store/initialState';
import { types } from '../actions/data';

const data = (state = initialState.data, action: IReduxAction) => {
    const { type, data } = action;
    switch (type) {
        case types.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: data.products,
            };
        case types.CHECKOUT_PENDING:
            return {
                ...state,
                isCheckoutPending: true,
            };
        case types.CHECKOUT_ERROR:
            return {
                ...state,
                isCheckoutCompleted: true,
                isCheckoutPending: false,
            };
        case types.CHECKOUT_SUCCESS:
            return {
                ...state,
                isCheckoutCompleted: false,
                isCheckoutPending: false,
            };
        default:
            return state;
    }
};

export default data;
