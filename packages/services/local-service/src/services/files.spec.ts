jest.mock('fs');
import fs from 'fs';
import { getFile, saveFile } from './files';

beforeEach(() => {
    jest.resetAllMocks();
});
describe('getFile', () => {
    const StackError = new Error('Stack error');
    it('should throw any error fs.readFileSync throws', () => {
        fs.readFileSync = jest.fn().mockImplementation(() => {
            throw StackError;
        });
        try {
            getFile('some/path');
        } catch (err) {
            expect(err).toEqual(StackError);
        }
    });
    it('should invoke fs.readFileSync', () => {
        getFile('some/path');
        expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    });
});

describe('saveFile', () => {
    const StackError = new Error('Stack error');
    it('should throw any error fs.writeFileSync throws', () => {
        fs.writeFileSync = jest.fn().mockImplementation(() => {
            throw StackError;
        });
        try {
            saveFile('some/path', 'some-content');
        } catch (err) {
            expect(err).toEqual(StackError);
        }
    });
    it('should invoke fs.writeFileSync', () => {
        saveFile('some/path', 'some-content');
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });
});
