import { App } from './App';
import { TestProvider } from '../tests';

const { mountWithRouterProps } = TestProvider();
describe('App', () => {
    it('should render', () => {
        const state = {
            common: {},
        };
        const root = mountWithRouterProps(<App />, state);
        expect(root).toMatchSnapshot();
    });
});
