import { Dispatch } from 'redux';
import { AxiosError, AxiosResponse } from 'axios';
import { GetStore } from '../../store';
import { fetcher, IFetcherConfig } from '../../../modules';
import types from './types';

const getProducts = () => async (dispatch: Dispatch, getState: GetStore) => {
    const {
        data: { products },
        common: { servicePorts },
    } = getState();
    dispatch({
        type: types.GET_PRODUCTS_PENDING,
    });
    const path = servicePorts ? `http://localhost:${servicePorts['local-service']}` : '';
    const config = {
        url: `${path}/products`,
        errorHandler: (error: AxiosError) => {
            dispatch({
                type: types.GET_PRODUCTS_ERROR,
                data: { message: error.message },
            });
        },
        responseHandler: (response: AxiosResponse) => {
            dispatch({
                type: types.GET_PRODUCTS_SUCCESS,
                data: { products: response?.data?.products },
            });
        },
    } as IFetcherConfig;
    if (!products) {
        await fetcher(config);
    }
};

export { getProducts };
