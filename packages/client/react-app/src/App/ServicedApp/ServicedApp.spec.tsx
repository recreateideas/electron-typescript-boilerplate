import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import EnzymeToJson from 'enzyme-to-json';
import { store } from '../../redux';
import { ServicedApp } from './ServicedApp';
jest.mock('../../hooks');
// eslint-disable-next-line import/first
import * as hooks from '../../hooks';

describe('<ServicedApp/>', () => {
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
        jest.spyOn(hooks, 'useServicePorts').mockReturnValue(undefined);
        const wrapper = mount(
            <Provider store={store}>
                <ServicedApp />
            </Provider>
        );
        const Loader = wrapper.exists('.setting-up');
        expect(Loader).toBeTruthy();
    });

    it('should render App when isHealthy is true', () => {
        jest.spyOn(hooks, 'useServicePorts').mockReturnValue({ 'some-service': 1111 });
        jest.spyOn(hooks, 'useHealthCheck').mockReturnValue(true);
        const wrapper = mount(
            <Provider store={store}>
                <ServicedApp />
            </Provider>
        );
        const Loader = wrapper.exists('App');
        expect(Loader).toBeTruthy();
    });
    it('should render .checking loader when isHealthy is undefined', () => {
        jest.spyOn(hooks, 'useServicePorts').mockReturnValue({ 'some-service': 1111 });
        jest.spyOn(hooks, 'useHealthCheck').mockReturnValue(undefined);
        const wrapper = mount(
            <Provider store={store}>
                <ServicedApp />
            </Provider>
        );
        const Loader = wrapper.exists('.checking');
        expect(Loader).toBeTruthy();
    });
    it('should render .not-responding loader when service-ports are loaded and isHealthy is false', () => {
        jest.spyOn(hooks, 'useServicePorts').mockReturnValue({ 'some-service': 1111 });
        jest.spyOn(hooks, 'useHealthCheck').mockReturnValue(false);
        const wrapper = mount(
            <Provider store={store}>
                <ServicedApp />
            </Provider>
        );
        const Loader = wrapper.exists('.not-responding');
        expect(Loader).toBeTruthy();
    });
});
