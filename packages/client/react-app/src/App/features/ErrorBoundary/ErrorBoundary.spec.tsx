import { ErrorBoundary } from './ErrorBoundary';
import { shallow } from 'enzyme';
import { TestProvider } from '../../../tests';
import { initialState } from '../../../redux';

const { mountWithProvider } = TestProvider(initialState);

describe('<ErrorBoundary/>', () => {
    const SomeError = new Error('some-component error');
    const ComponentThatThrows = () => {
        throw SomeError;
        return <div>Content</div>; // eslint-disable-line
    };
    it('should render', () => {
        const root = mountWithProvider(
            <ErrorBoundary>
                <div>some-children</div>
            </ErrorBoundary>
        );
        expect(root).toMatchSnapshot();
    });
    it('should catch any error its children throw and display it', () => {
        const errorRoot = shallow(
            <ErrorBoundary>
                <ComponentThatThrows />
            </ErrorBoundary>
        );
        errorRoot.instance().componentDidCatch?.(SomeError, { componentStack: 'some-stack' });
        errorRoot.update();
        const header = errorRoot.find('.error-boundary.header');
        const body = errorRoot.find('.error-boundary.error-body');
        expect(header.length).toBe(1);
        expect(body.length).toBe(1);
        expect(JSON.stringify(body.at(0), null, 4)).toEqual(JSON.stringify(SomeError, null, 4));
    });
});
