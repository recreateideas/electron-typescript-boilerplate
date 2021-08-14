/* eslint-disable import/first */
jest.mock('use-mobile-detect-hook', () => () => ({
    isMobile: jest.fn().mockReturnValue(true),
    isDesktop: jest.fn().mockReturnValue(false),
    isAndroid: jest.fn().mockReturnValue(true),
    isIos: jest.fn().mockReturnValue(false),
}));
import { renderHook } from '@testing-library/react-hooks';
import { useUserAgent } from './use-user-agent';

describe('useUserAgent', () => {
    it('should return the user agent', () => {
        const { result } = renderHook(() => useUserAgent());
        expect(result.current).toEqual({
            isMobile: true,
            isDesktop: false,
            isAndroid: true,
            isIos: false,
        });
    });
});
