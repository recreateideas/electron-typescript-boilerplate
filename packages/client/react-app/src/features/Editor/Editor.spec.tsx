import { Editor } from './Editor';
import { TestProvider } from '../../tests';

const { mountWithProvider } = TestProvider({});

describe('Editor', () => {
    it('should render', () => {
        const root = mountWithProvider(<Editor />);

        expect(root).toMatchSnapshot();
    });
});
