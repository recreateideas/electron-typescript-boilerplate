jest.mock('electron');
jest.mock('../redux');
import * as redux from '../redux';
import { renderWrappedHook } from '../tests';
import useServicePorts from './use-service-ports';
import { defaultServicePorts } from './default-service-ports';
describe('useServicePorts', () => {
    it('should return defaultServicePorts by default', async () => {
        const dispatchSpy = jest.fn();
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchSpy);
        jest.spyOn(redux, 'useSelector').mockReturnValue(defaultServicePorts);
        const { result } = renderWrappedHook(() => useServicePorts());
        expect(result.current).toEqual(defaultServicePorts);
    });
    it('should return defaultServicePorts by default', () => {
        const servicePorts = {
            'some-service': 1111,
        };
        const dispatchSpy = jest.fn();
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchSpy);
        jest.spyOn(redux, 'useSelector').mockReturnValue(servicePorts);
        const { result } = renderWrappedHook(() => useServicePorts());
        expect(result.current).toEqual(servicePorts);
    });
});
