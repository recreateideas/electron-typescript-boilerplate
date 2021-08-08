import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import store from '../redux';

const wrapper = ({ children }: any) => <Provider store={store}>{children}</Provider>;

const renderWrappedHook = (hook: () => any) => renderHook(hook, { wrapper });

export { renderWrappedHook };
