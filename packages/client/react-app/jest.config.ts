module.exports = {
    coveragePathIgnorePatterns: ['/tests/', 'index.ts', 'typings.ts'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};
