import { IReduxAction } from '../store';
import { initialState } from '../store/initialState';
import { types } from '../actions/theme';

const theme = (state = initialState.theme, action: IReduxAction) => {
    const { type, data } = action;
    switch (type) {
        case types.SET_THEME_MODE:
            return {
                ...state,
                mode: data.mode,
            };
        case types.SET_USER_AGENT:
            return {
                ...state,
                userAgent: data.userAgent,
            };
        default:
            return state;
    }
};

export default theme;
