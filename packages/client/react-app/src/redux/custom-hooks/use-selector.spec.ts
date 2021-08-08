import * as reactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { isEqual } from 'lodash';
import { useSelector } from './use-selector';

describe('useSelector', () => {
    Object.defineProperty(reactRedux, 'useSelector', {
        value: jest.fn(),
    });
    it('should call react-redux useSelector', () => {
        renderHook(() => useSelector(jest.fn()));
        expect(reactRedux.useSelector).toHaveBeenCalledTimes(1);
    });
    it('should call react-redux useSelector with the selector passed and lodash isEqual by default', () => {
        const selector = jest.fn();
        renderHook(() => useSelector(selector));
        expect(reactRedux.useSelector).toHaveBeenCalledTimes(1);
        expect(reactRedux.useSelector).toHaveBeenCalledWith(selector, isEqual);
    });
    it('should call react-redux useSelector with the selector passed and () => true)', () => {
        const selector = jest.fn();
        renderHook(() => useSelector(selector, false));
        expect(reactRedux.useSelector).toHaveBeenCalledTimes(1);
        expect(reactRedux.useSelector).toHaveBeenCalledWith(selector, expect.any(Function));
    });
});
