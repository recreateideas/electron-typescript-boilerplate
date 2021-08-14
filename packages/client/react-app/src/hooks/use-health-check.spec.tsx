/* eslint-disable import/first */
import { renderWrappedHook } from '../tests';
import useHealthCheck from './use-health-check';
jest.mock('../utils');
import * as utils from '../utils';
jest.mock('../redux');
import * as redux from '../redux';

describe('useHealthCheck', () => {
    it('should return undefined by default', async () => {
        const { result } = renderWrappedHook(() => useHealthCheck({ servicePorts: undefined }));
        expect(result.current).toBe(undefined);
    });
    it('should return true if there are servicePorts and servicesHealthcheck returns true', async () => {
        const servicePorts = {
            'some-service': 1111,
        };
        jest.spyOn(utils, 'servicesHealthcheck').mockResolvedValue(true);
        jest.spyOn(redux, 'useSelector').mockReturnValue("anything-it-doesn't-matter");
        const { result, waitForNextUpdate } = renderWrappedHook(() =>
            useHealthCheck({ servicePorts })
        );
        await waitForNextUpdate();
        expect(result.current).toBe(true);
    });
    it('should return false if there are servicePorts and servicesHealthcheck returns false', async () => {
        const servicePorts = {
            'some-service': 1111,
        };
        jest.spyOn(utils, 'servicesHealthcheck').mockResolvedValue(false);
        jest.spyOn(redux, 'useSelector').mockReturnValue("anything-it-doesn't-matter");
        const { result, waitForNextUpdate } = renderWrappedHook(() =>
            useHealthCheck({ servicePorts })
        );
        await waitForNextUpdate();
        expect(result.current).toBe(false);
    });
});
