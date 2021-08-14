/* eslint-disable import/first */
jest.mock('use-mobile-detect-hook', () => () => ({
    isMobile: jest.fn().mockReturnValue(false),
    isDesktop: jest.fn().mockReturnValue(false),
    isAndroid: jest.fn().mockReturnValue(true),
    isIos: jest.fn().mockReturnValue(false),
}));
import { renderHook } from '@testing-library/react-hooks';
import { useUserAgent } from './use-user-agent';

Object.defineProperty(window, 'innerWidth', {
    writable: true,
    value: 300,
});
describe('useUserAgent - 2', () => {
    it('should return the user agent, working out isMobile from the window size', () => {
        const { result } = renderHook(() => useUserAgent());
        expect(result.current).toEqual({
            isMobile: true,
            isDesktop: false,
            isAndroid: true,
            isIos: false,
        });
    });
});
