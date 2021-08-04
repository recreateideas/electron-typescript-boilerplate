module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    roots: ['<rootDir>/src'],
    coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
    collectCoverageFrom: ['./src/**/*.ts'],
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
};
