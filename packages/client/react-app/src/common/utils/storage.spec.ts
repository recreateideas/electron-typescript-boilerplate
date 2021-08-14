import { getFromLS, saveToLS } from './storage';

afterEach(() => {
    window.localStorage.clear();
});

const key = 'some-key';
describe('getFromLS', () => {
    const key = 'some-key';
    it('should return what window.localStorage.getItem returns', () => {
        window.localStorage.setItem(key, '"some-value"');
        const result = getFromLS(key);
        expect(result).toBe('some-value');
    });
    it('should JSON.parse and return what window.localStorage.getItem returns', () => {
        window.localStorage.setItem(key, '{ "some": "value" }');
        const result = getFromLS(key);
        expect(result).toEqual({ some: 'value' });
    });
});

describe('saveToLS', () => {
    it("should JSON.stringify and save to window.localStorage what it's passed as argument", () => {
        const value = '{ "some": "value" }';
        saveToLS(key, value);
        const saved = window.localStorage.getItem(key);
        expect(JSON.parse(saved || '')).toEqual(value);
    });
});
