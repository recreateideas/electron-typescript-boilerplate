import { AuthenticatedRoute } from './AuthenticatedRoute';
jest.mock('../../../redux');
import * as redux from '../../../redux';
import { TestProvider } from '../../../tests';

const { mountWithRouterProps } = TestProvider({});

describe('AuthenticatedRoute', () => {
    it('should render', () => {
        const props = {
            render: () => <div />,
        };
        const state = {
            router: {
                location: 'some-location',
            },
        };
        const root = mountWithRouterProps(<AuthenticatedRoute {...props} />, state);
        expect(root).toMatchSnapshot();
    });

    it('should call dispatch setRouteParams if path and location props are supplied', () => {
        const props = {
            render: () => <div />,
            path: 'some-path',
            location: {
                pathname: 'some-path-name',
            },
        };
        const state = {
            router: {
                location: 'some-location',
            },
        };
        const {
            actions: { router },
        } = redux;
        const actionSpy = jest.fn();
        const dispatchSpy = jest.fn();
        jest.spyOn(router, 'setRouteParams').mockReturnValue(actionSpy);
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchSpy);
        mountWithRouterProps(<AuthenticatedRoute {...props} />, state);
        expect(dispatchSpy).toHaveBeenCalledWith(actionSpy);
    });

    it('should NOT call dispatch setRouteParams if no path and location props are supplied', () => {
        const props = {
            render: () => <div />,
        };
        const state = {
            router: {
                location: 'some-location',
            },
        };
        const dispatchSpy = jest.fn();
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchSpy);
        mountWithRouterProps(<AuthenticatedRoute {...props} />, state);
        expect(dispatchSpy).not.toHaveBeenCalled();
    });
});
