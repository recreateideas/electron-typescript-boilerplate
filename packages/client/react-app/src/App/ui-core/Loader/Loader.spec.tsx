import { Loader } from './Loader';
import { TestProvider } from '../../../tests';

const { mountWithProvider } = TestProvider({});

describe('<Loader/>', () => {
    it('should render', () => {
        const root = mountWithProvider(<Loader />);

        expect(root).toMatchSnapshot();
    });
});
