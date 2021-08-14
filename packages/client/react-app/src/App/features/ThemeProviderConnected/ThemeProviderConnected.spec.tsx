/* eslint-disable import/first */
import { ThemeProviderConnected } from './ThemeProviderConnected';
jest.mock('../../../redux');
import * as redux from '../../../redux';
import { TestProvider } from '../../../tests';
import { initialState } from '../../../redux';
jest.mock('../../../common/hooks');
import * as hooks from '../../../common/hooks';
jest.mock('../../../common/utils');
import * as utils from '../../../common/utils';

const { mountWithProvider } = TestProvider(initialState);

describe('<ThemeProviderConnected/>', () => {
    const userAgent = {
        isMobile: true,
        isDesktop: false,
        isAndroid: false,
        isIos: true,
    };
    it('should render', () => {
        const dispatchSpy = jest.fn();
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchSpy);
        const root = mountWithProvider(
            <ThemeProviderConnected>some-children</ThemeProviderConnected>
        );
        expect(root).toMatchSnapshot();
    });
    it('should render the children wrapped by no-theme div if no theme mode is found', () => {
        const dispatchSpy = jest.fn();
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchSpy);
        const root = mountWithProvider(
            <ThemeProviderConnected>
                <div className="children">some-children</div>
            </ThemeProviderConnected>
        );
        const children = root.find('.no-theme .children');
        expect(children.length).toBe(1);
    });

    it('should render the children wrapped in ThemeProvider if a theme mode is found', () => {
        const dispatchSpy = jest.fn();
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchSpy);
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchSpy);
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce('light')
            .mockReturnValueOnce(userAgent);
        const root = mountWithProvider(
            <ThemeProviderConnected>
                <div className="children">some-children</div>
            </ThemeProviderConnected>
        );
        const children = root.find('ThemeProvider .children');
        expect(children.length).toBe(1);
    });
    it('should dispatch setUserAgent with the userAgent found', () => {
        const dispatchSpy = jest.fn();
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchSpy);
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce('light')
            .mockReturnValueOnce(undefined);
        jest.spyOn(hooks, 'useUserAgent')
            .mockReturnValueOnce(userAgent)
            .mockReturnValueOnce(userAgent);
        mountWithProvider(
            <ThemeProviderConnected>
                <div />
            </ThemeProviderConnected>
        );
        expect(redux.actions.theme.setUserAgent).toHaveBeenCalledWith(userAgent);
    });

    it('should dispatch setThemeMode with the mode found in localStorage', () => {
        const dispatchSpy = jest.fn();
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchSpy);
        jest.spyOn(redux, 'useSelector').mockReturnValueOnce('light');
        jest.spyOn(utils, 'getFromLS').mockReturnValue('dark');

        mountWithProvider(
            <ThemeProviderConnected>
                <div />
            </ThemeProviderConnected>
        );
        expect(redux.actions.theme.setThemeMode).toHaveBeenCalledWith('dark');
    });

    it('should dispatch setThemeMode 2 times, once after having found the system dark mode', () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: (query: string) => ({
                matches: false,
                addEventListener: jest.fn().mockImplementation((_, fn) => fn({ matches: false })),
            }),
        });
        const dispatchSpy = jest.fn();
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchSpy);
        jest.spyOn(redux, 'useSelector').mockReturnValueOnce('light');
        jest.spyOn(utils, 'getFromLS').mockReturnValue(null);

        mountWithProvider(
            <ThemeProviderConnected>
                <div />
            </ThemeProviderConnected>
        );
        expect(redux.actions.theme.setThemeMode).toHaveBeenCalledTimes(2);
        expect(redux.actions.theme.setThemeMode).toHaveBeenNthCalledWith(2, 'light');
    });

    it('should dispatch setThemeMode 2 times, once after having found the system dark mode - 2', () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: (query: string) => ({
                matches: true,
                addEventListener: jest.fn().mockImplementation((_, fn) => fn({ matches: true })),
            }),
        });
        const dispatchSpy = jest.fn();
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchSpy);
        jest.spyOn(redux, 'useSelector').mockReturnValueOnce('light');
        jest.spyOn(utils, 'getFromLS').mockReturnValue(null);

        mountWithProvider(
            <ThemeProviderConnected>
                <div />
            </ThemeProviderConnected>
        );
        expect(redux.actions.theme.setThemeMode).toHaveBeenCalledTimes(2);
        expect(redux.actions.theme.setThemeMode).toHaveBeenNthCalledWith(2, 'dark');
    });
});
