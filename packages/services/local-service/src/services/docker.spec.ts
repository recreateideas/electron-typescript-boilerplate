jest.mock('fs');
import fs from 'fs';
jest.mock('js-yaml');
import json from 'js-yaml';
jest.mock('json-to-pretty-yaml');
import yaml from 'json-to-pretty-yaml';
jest.mock('child_process');
import childProcess from 'child_process';
import {
    getYamlAsJSON,
    saveJsonAsYaml,
    getYamlAsObject,
    containerAction,
    composeAction,
} from './docker';

beforeEach(() => {
    jest.resetAllMocks();
});

describe('getYamlAsJSON', () => {
    it('should throw any error fs.readFileSync throws', () => {
        const StackError = new Error('Stack error');
        fs.readFileSync = jest.fn().mockImplementation(() => {
            throw StackError;
        });
        try {
            getYamlAsJSON(['some/path']);
        } catch (err) {
            expect(err).toEqual(StackError);
        }
    });
    it('should invoke fs.readFileSync and json.load as many times are there are items in the arg array', () => {
        getYamlAsJSON(['some/path', 'another/path']);
        expect(fs.readFileSync).toHaveBeenCalledTimes(2);
        expect(json.load).toHaveBeenCalledTimes(2);
    });
});

describe('saveJsonAsYaml', () => {
    it('should throw any error fs.writeFileSync throws', () => {
        const StackError = new Error('Stack error');
        fs.writeFileSync = jest.fn().mockImplementation(() => {
            throw StackError;
        });
        try {
            saveJsonAsYaml('some/path', '{"some": "content"}');
        } catch (err) {
            expect(err).toEqual(StackError);
        }
    });
    it('should throw a SyntaxError if the json input is malformed', () => {
        try {
            saveJsonAsYaml('some/path', '{"some": "BROKEN__JSON');
        } catch (err) {
            expect(err).toEqual(new SyntaxError('Unexpected end of JSON input'));
        }
    });
    it('should invoke fs.writeFileSync and json.stringify once', () => {
        saveJsonAsYaml('some/path', '{"some": "content"}');
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
        expect(yaml.stringify).toHaveBeenCalledTimes(1);
    });
});

describe('getYamlAsObject', () => {
    it('should throw any error fs.readFileSync throws', () => {
        const StackError = new Error('Stack error');
        fs.readFileSync = jest.fn().mockImplementation(() => {
            throw StackError;
        });
        try {
            getYamlAsObject(['some/path']);
        } catch (err) {
            expect(err).toEqual(StackError);
        }
    });
    it('should invoke fs.readFileSync and json.load as many times are there are items in the arg array', () => {
        getYamlAsObject(['some/path', 'another/path']);
        expect(fs.readFileSync).toHaveBeenCalledTimes(2);
        expect(json.load).toHaveBeenCalledTimes(2);
    });

    it('return a path-object dictionary', () => {
        json.load = jest.fn().mockImplementation(() => {
            return { some: 'object' };
        });
        const result = getYamlAsObject(['some/path', 'another/path']);
        expect(result).toEqual({
            'another/path': { some: 'object' },
            'some/path': { some: 'object' },
        });
    });
});

describe('containerAction', () => {
    it('should throw any error childProcess.execSync throws', () => {
        const StackError = new Error('Stack error');
        childProcess.execSync = jest.fn().mockImplementation(() => {
            throw StackError;
        });
        try {
            containerAction({ composeFile: 'file', action: 'up', serviceName: '' });
        } catch (err) {
            expect(err).toEqual(StackError);
        }
    });
    it('should call childProcess.execSync with the right arguments', () => {
        const args = { composeFile: 'some/file.yml', action: 'up', serviceName: 'servo' };
        containerAction(args);
        expect(childProcess.execSync).toHaveBeenCalledWith(
            'docker-compose -f some/file.yml up servo'
        );
    });
});

describe('composeAction', () => {
    it('should throw any error childProcess.exec throws', () => {
        const StackError = new Error('Stack error');
        //@ts-ignore
        childProcess.exec = jest.fn().mockImplementation(() => {
            throw StackError;
        });
        try {
            composeAction({ composeFile: 'file', action: 'up', serviceName: '' });
        } catch (err) {
            expect(err).toEqual(StackError);
        }
    });
    it('should call childProcess.exec with the right arguments', () => {
        const args = { composeFile: 'some/file.yml', action: 'up', serviceName: 'servo' };
        composeAction(args);
        expect(childProcess.exec).toHaveBeenCalledWith('docker-compose -f some/file.yml up servo');
    });
});
