import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import EnzymeToJson from 'enzyme-to-json';
import { store } from '../../redux';
jest.mock('../../hooks');
import * as hooks from '../../hooks';
import { ServicedApp } from './ServicedApp';

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <ServicedApp />
            </Provider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
    it('should match snapshot', () => {
        const subject = mount(
            <Provider store={store}>
                <ServicedApp />
            </Provider>
        );
        expect(EnzymeToJson(subject)).toMatchSnapshot();
    });

    it('should render .setting-up loader when service-ports are undefined', () => {
        jest.spyOn(hooks, 'useServicePorts').mockImplementation(() => undefined);
        const wrapper = mount(
            <Provider store={store}>
                <ServicedApp />
            </Provider>
        );
        const Loader = wrapper.exists('.setting-up');
        expect(Loader).toBeTruthy();
    });
    it('should render .checking loader when isHealthy is undefined', () => {
        jest.spyOn(hooks, 'useServicePorts').mockImplementation(() => ({ 'some-service': 1111 }));
        jest.spyOn(hooks, 'useHealthCheck').mockImplementation(() => undefined);
        const wrapper = mount(
            <Provider store={store}>
                <ServicedApp />
            </Provider>
        );
        const Loader = wrapper.exists('.checking');
        expect(Loader).toBeTruthy();
    });
    it('should render .not-responding loader when service-ports are loaded and isHealthy is false', () => {
        jest.spyOn(hooks, 'useServicePorts').mockImplementation(() => ({ 'some-service': 1111 }));
        jest.spyOn(hooks, 'useHealthCheck').mockImplementation(() => false);
        const wrapper = mount(
            <Provider store={store}>
                <ServicedApp />
            </Provider>
        );
        const Loader = wrapper.exists('.not-responding');
        expect(Loader).toBeTruthy();
    });
});
